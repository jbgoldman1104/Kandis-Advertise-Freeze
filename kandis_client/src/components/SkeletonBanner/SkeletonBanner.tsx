import { Skeleton, styled } from '@mui/material';

const SkeletonBanner = () => {
	return (
		<StyledSkeleton variant={"circular"} />
	);
};


export const StyledSkeleton = styled(Skeleton)(({ theme }) => {
	return {
		width: '512px',
		height: '200px',
		background: 'rgba(255, 255, 255, 0.13)',
		borderRadius: '10px'
	}
})

export default SkeletonBanner;