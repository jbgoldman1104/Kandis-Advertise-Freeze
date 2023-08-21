import styles from './Banners.module.scss'
import Container from '../../../../containers/Container/Container';
import { useQuery } from '@tanstack/react-query';
import BannerService from '../../../../core/services/Banner.service';
import { useEffect, useState } from 'react';
import { IBanner } from '../../../../modules/AddBannerForm/types';
import AddBanner from '../../../../components/AddBanner/AddBanner';
import { useAppDispatch } from '../../../../core/hooks/storeHooks';
import { setBannerActive } from '../../../../core/redux/slices/BannerSlice';
import BannersContainer from '../../../../containers/BannersContainer/BannersContainer';
import { AddBannerForm } from '../../../../modules/AddBannerForm';
import SkeletonBanner from '../../../../components/SkeletonBanner/SkeletonBanner';
import BannerAdmin from '../../../../components/BannerAdmin/BannerAdmin';
import { v4 as uuidv4 } from 'uuid';
import { AdminReview } from '../../../../modules/AdminReview';
import Banner from '../../../../components/Banner/Banner';
import { BannerReview } from '../../../../modules/BannerReview';

const Banners = () => {
	const { data, isLoading } = useQuery<IBanner[]>(['get banners'], () => BannerService.getAll())
	const [dataLength, setDataLength] = useState<number>(0)

	const dispatch = useAppDispatch()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const openForm = () => {
		dispatch(setBannerActive(true))
	}

	const loadingScreen = Array(8).fill("").map((index) => {
		return <SkeletonBanner key={uuidv4()} />
	})

	useEffect(() => {
		if (data && !isLoading) {
			setDataLength(data.length)
		}
	}, [data, dataLength, isLoading]);


	return (
		<section className={styles.banners}>
			<Container>
				<BannersContainer>
					{isLoading && loadingScreen}

					{
						// eslint-disable-next-line array-callback-return
						!isLoading && data && data.map((item: IBanner) => {
							if (item.status === 'admin') {
								return <BannerAdmin key={uuidv4()} imageURL={item.imageURL} bannerId={item._id} />
							} else if (item.status === 'production') {
								return <Banner key={uuidv4()} imageURL={item.imageURL} bannerInd={item._id} />
							}
						})
					}

					{
						!isLoading && dataLength < 8 && Array(8 - dataLength).fill("").map(() => {
								return <AddBanner key={uuidv4()} onClick={openForm} />
							})
					}
				</BannersContainer>
			</Container>

			<AddBannerForm	/>
			<AdminReview />
			<BannerReview />
		</section>
	);
};

export default Banners;