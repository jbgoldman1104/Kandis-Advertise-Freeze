import { ButtonBase } from '@mui/material';
import { Coin, Coins, ExtensionOptions, Fee, LCDClient } from '@terra-money/terra.js';

const TestButton = async () => {
	const client = new LCDClient({
		URL: 'https://pisco-lcd.terra.dev',
		chainID: 'pisco-1',
	});


	async function getTaxAmount(amount?: Coins, lcd?: LCDClient) {
		if (!amount || !lcd) {
			return undefined;
		}

		const taxRate = await (
			await fetch(lcd.config.URL + '/terra/treasury/v1beta1/tax_rate', {
				redirect: 'follow'
			})
		).json();

		let taxes = new Coins();
		for (let coin of amount.toArray()) {
			const tax = coin.amount.toNumber() * taxRate.tax_rate;
			taxes = taxes.add(new Coin(coin.denom, tax));
		}

		return taxes;
	}



	return (
		<ButtonBase>Test</ButtonBase>
	);
};

export default TestButton;