import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material'
import { ReactComponent as IcRadioButton } from '../../assets/icons/ic_radioButton.svg'
import { ReactComponent as IcCheckedRadioButton } from '../../assets/icons/ic_chekedRadioButton.svg'
import React from 'react'

interface AdvertiseRadioProps {
	options: { value: string; label: string; defaultChecked?: boolean }[]
	onChange?: (value: string) => void
	value?: string
	defaultValue?: string
}

const StyledRadio = styled(Radio)(({ theme }) => ({
	// '&.Mui-checked': {
	// 	color: 'var(--yellow)',
	// 	'.Mui-checked': 'var(--yellow)'
	// }
}))

const AdvertiseRadio: React.FC<AdvertiseRadioProps> = ({
	options,
	onChange,
	value,
	defaultValue
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange((event.target as HTMLInputElement).value)
		}
	}

	return (
		<RadioGroup
			defaultValue={defaultValue}
			value={value}
			onChange={handleChange}

		>
			{options.map(option => (
				<FormControlLabel
					sx={{ fontFamily: "'PP Mori', sans-serif", color: '#B7B7B7;' }}
					key={option.value}
					value={option.value}
					control={
						<StyledRadio
							icon={<IcRadioButton />}
							checkedIcon={<IcCheckedRadioButton />}
						/>
					}
					label={option.label}
				/>
			))}
		</RadioGroup>
	)
}

export default AdvertiseRadio
