import { FC } from 'react';
import styles from './Image.module.scss'
import classNames from 'classnames';
import { REACT_APP_API_KEY } from '../../utils/consts';

interface ImageProps {
	src: string
	alt?: string
	fluid?: boolean
	api?: boolean
	className?: string
}

const Image: FC<ImageProps> = ({ src, alt, fluid, api, className, ...props }) => {
	const API_KEY: string = `${REACT_APP_API_KEY}/api`

	return (
		<img
			{...props}
			src={api ? API_KEY + src : src}
			alt={alt}
			className={classNames(fluid && styles.fluid, className)}
		/>
	);
};

export default Image;