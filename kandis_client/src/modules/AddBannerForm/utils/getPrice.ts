export const getPrice = (value: number) => {
	let price: number =  0;

	switch (value) {
		case 12:
			price = 100
			break;
		case 24:
			price = 150
			break
		case 36:
			price = 200
			break
		case 48:
			price = 250
			break
		case 60:
			price = 300
			break
		case 72:
			price = 350
			break
		case 84:
			price = 400
			break
		case 96:
			price = 450
			break
		case 108:
			price = 500
			break
		case 120:
			price = 550
			break
		case 132:
			price = 600
	}

	return price
}