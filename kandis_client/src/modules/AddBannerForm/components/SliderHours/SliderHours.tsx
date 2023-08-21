import { Box } from '@mui/material';
import { sliderHourseData } from './SliderHourse.data';
import { CustomSlider } from './styles';
import React, { FC, forwardRef, useState } from 'react';


interface SliderHoursProps {
	value?: number
	onChange?: any
}

const SliderHours = forwardRef<HTMLDivElement, SliderHoursProps>(
	({ value, onChange, ...props }, ref) => {

		return (
			<Box sx={{ width: '100%', padding: '0 5px' }}>
				<CustomSlider
					ref={ref}
					{...props}
					aria-label="Advertising price"
					step={12}
					min={12}
					max={132}
					marks={sliderHourseData}
					value={value}
					onChange={onChange}
				/>
			</Box>
		);
	}
);

export default SliderHours;