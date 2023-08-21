import { ReactComponent as IcLogo } from '../../assets/icons/ic_logo.svg'
import { ReactComponent as IcLogoMobile } from '../../assets/icons/ic_logoMobile.svg'
import styles from './Logo.module.scss'
import { useMediaQuery } from '@mui/material'

const Logo = () => {
	const isDesktop = useMediaQuery('(min-width:768px)')

	return (
		<a className={styles.logo} href={'/'}>
			{isDesktop ? <IcLogo /> : <IcLogoMobile />}
		</a>
	)
}

export default Logo
