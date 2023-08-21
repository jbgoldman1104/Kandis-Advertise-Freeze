import styles from './AddBanner.module.scss'
import { FC } from 'react'
import { StyledAddButton } from './StyledAddButton'

interface AddBannerProps {
	onClick: () => void
}

const AddBanner: FC<AddBannerProps> = ({ onClick }) => {
	return (
		<div className={styles.addBanner}>
			<StyledAddButton onClick={onClick}>Add Banner</StyledAddButton>
		</div>
	)
}

export default AddBanner
