import Container from '../../../../containers/Container/Container';
import styles from './Banners.module.scss';
import AddBanner from '../../../../components/AddBanner/AddBanner';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import { setBannerActive } from '../../../../core/redux/slices/BannerSlice';
import { AddBannerForm } from '../../../../modules/AddBannerForm';
import BannersContainer from '../../../../containers/BannersContainer/BannersContainer';
import { useQuery } from '@tanstack/react-query';
import BannerService from '../../../../core/services/Banner.service';
import { useEffect, useState } from 'react';
import { BannerReview } from '../../../../modules/BannerReview';
import { v4 as uuidv4 } from 'uuid';
import SkeletonBanner from '../../../../components/SkeletonBanner/SkeletonBanner';
import { IBanner } from '../../../../modules/AddBannerForm/types';
import BannerAdmin from '../../../../components/BannerAdmin/BannerAdmin';
import Banner from '../../../../components/Banner/Banner';

const Banners = () => {
	const [dataLength, setDataLength] = useState<number>(0);
	const dispatch = useAppDispatch();
	const status = 'production';
	const { data, isLoading, isError } = useQuery(['get production banners', status],
		() => BannerService.getAll(status)
	);

	useEffect(() => {
		if (data && !isLoading) {
			setDataLength(data.length);
		}
	}, [data, dataLength, isLoading]);

	const loadingScreen = Array(8).fill('').map((index) => {
		return <SkeletonBanner key={uuidv4()} />;
	});

	const openForm = () => {
		dispatch(setBannerActive(true));
	};

	return (
		<section className={styles.banners}>
			<Container>
				<BannersContainer>
					{isError && <h1>Error!</h1>}
					{isLoading && loadingScreen}

					{
						!isError && !isLoading && data && data.map((item: IBanner) => {
							return <Banner key={uuidv4()} imageURL={item.imageURL} bannerInd={item._id} />;
						})
					}

					{
						!isError && !isLoading && dataLength < 8 && Array(8 - dataLength).fill('').map(() => {
							return <AddBanner key={uuidv4()} onClick={openForm} />;
						})
					}
				</BannersContainer>
			</Container>

			<AddBannerForm />
			<BannerReview />
		</section>
	);
};

export default Banners;
