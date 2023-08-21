import { Coin, Coins, ExtensionOptions, Fee, LCDClient, MsgExecuteContract, TxInfo, Wallet } from "@terra-money/feather.js";
import { ConnectedWallet, createLCDClient, useConnectedWallet } from "@terra-money/wallet-provider";

function isConnectedWallet(x: Wallet | ConnectedWallet): x is ConnectedWallet {
	if(!x) {
	  return false;
	}
	return typeof (x as Wallet).key === "undefined";	
}

async function waitForInclusionInBlock(lcd: LCDClient, txHash: string, chain: string): Promise<TxInfo | undefined> {
	let res;
	for (let i = 0; i <= 50; i++) {
	  try {
		res = await lcd.tx.txInfo(txHash, chain);
	  } catch (error) {
		// NOOP
	  }
		
	  if (res) {
		break;
	  }
		
	  await new Promise((resolve) => setTimeout(resolve, 500));
	}
		
	return res;
  }


async function getTaxAmount(amount?: Coins, chain?: string, lcd?: LCDClient) {
	if(!amount || !lcd || !chain) {
	  return 0;
	}
	console.log('lcd config', lcd.config)
	const taxRate = await(
	  
	  await fetch(lcd.config[chain].lcd + '/terra/treasury/v1beta1/tax_rate', {
		redirect: 'follow'
	  })
	).json();
  
	const amountUluna = amount.get('uluna');
  
	if(!amountUluna) {
	  return 0;
	}
  
	const taxInUluna = amountUluna.amount.toNumber() * taxRate.tax_rate;
  
	return taxInUluna;
};

async function getTransactionData(messages: any, senderAddress: string, funds: Coins, chain: string, client: LCDClient, fcdUrl: string, isClassic: boolean): Promise<ExtensionOptions> {
	let tax = 0;
	if(isClassic) {
	  tax = await getTaxAmount(funds, chain, client);
	}
  
	const gasPrices = await(
	  await fetch(fcdUrl + '/v1/txs/gas_prices', {
		/*redirect: 'follow',
		mode: 'cors',
		headers: {
		  'Access-Control-Allow-Origin':'https://miata.io'
		}*/
	  })
	).json();
  
	const gasAdjustment = 2.5;
	const gasPricesCoins = new Coins(gasPrices);
  
	const account = await client.auth.accountInfo(senderAddress);
	const signerDataArray = [{
	  address: senderAddress,
	  publicKey: account.getPublicKey(),
	  sequenceNumber: account.getSequenceNumber()
	}];
  
	var txFee = await client.tx.estimateFee(signerDataArray, { msgs: messages, gasPrices: gasPricesCoins, gasAdjustment: gasAdjustment, feeDenoms: ['uluna'], chainID: chain });
	
	console.log(tax, gasPrices, txFee);
  
	let txdata : ExtensionOptions = {
		msgs: messages,
		chainID: chain
	};
  
	console.log(gasPrices, txdata, txFee);
  
	txdata.fee = new Fee(txFee.gas_limit, txFee.amount.add(new Coin('uluna', tax)));
	return txdata;
  }

class KandisTransaction {
	private readonly _contractAddress: string;
	private fcd = 'https://terra-classic-fcd.publicnode.com'; // this can stay the same for columbus-5
	private gasPrices : any;
	private useChainID = 'rebel-2';
	private _terra: LCDClient | undefined;
	private gasAdjustment = 1.5;
	private connectedWallet = useConnectedWallet();
	/*private _mk = new MnemonicKey({
		mnemonic: 'hello nft javascript enter exit money table morning apple schema dog undefined',
	});
	private _wallet = this._terra.wallet(this._mk);
	private _ownerAddress = this._wallet.key.accAddress*/

	private _walletAddress = this.connectedWallet?.addresses[this.useChainID];

	constructor(contractAddress: string) {
		this._contractAddress = contractAddress;

		this.init();
	}

	private init = async () => {
		this.gasPrices = await fetch(`${this.fcd}/v1/txs/gas_prices`).then(res => res.json());
		this._terra = createLCDClient({
			'rebel-2': {
				lcd: 'https://lcd.luncblaze.com', //for columbus this is terra-classic-lcd.publicnode.com
				chainID: 'rebel-2',
				prefix: 'terra',
				isClassic: true,
				gasAdjustment: this.gasAdjustment,
				gasPrices: this.gasPrices,
			}
		});
	}

	public sendTransaction = async (msg: string | object, funds? : Coins) => {
		if(!this._walletAddress || !this.connectedWallet || !this._terra) {
			//console.error('no wallet address, wallet not connected?');
			throw new Error('No wallet address, wallet not connected?')
		}

		if (!funds) {
			funds = new Coins();
		}
		try {
			const execute = new MsgExecuteContract(
				this._walletAddress,
				this._contractAddress,
				msg,
				funds
			)
			const txdata = getTransactionData(execute, this._walletAddress, funds, this.useChainID, this._terra, this.fcd, true).then(async (txdata) => {
				(async () => {
					if(!this.connectedWallet) {
						return;
					}

					if (isConnectedWallet(this.connectedWallet)) {
						return this.connectedWallet.post(txdata).then((tx) => {
							if(!tx || !this._terra) {
								return;
							}

							return waitForInclusionInBlock(this._terra, tx.result.txhash, this.useChainID);
						}).catch((error) => {
							console.error(error);
							return null;
						});
					} else {
						throw new Error('Not connected wallet')
					}
				})().then(async () => {
					console.log('buy success');
					await new Promise((resolve) => setTimeout(resolve, 500));
					// SHOW CONFIRMATION
				}).catch((error: any) => {
					throw new Error(error)
				}).finally(() => {
					// hide broadcasting info
				});
			}).catch((error: any) => {
				throw new Error(error)
			});
			
			if(!txdata) {
				return;
			}
		} catch (error: any) {
			throw new Error(error)
		}

	}
}

export default KandisTransaction