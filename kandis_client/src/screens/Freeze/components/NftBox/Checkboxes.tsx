import { FlexWrapper } from './styles';
import AdvetiseCheckbox from '../../../../ui/AdvertiseCheckbox/AdvetiseCheckbox';

const Checkboxes = () => {
	return (
		<FlexWrapper>
			<AdvetiseCheckbox label={'Gold'} />
			<AdvetiseCheckbox label={'Silver'} />
			<AdvetiseCheckbox label={'Bronze'} />
		</FlexWrapper>
	);
};

export default Checkboxes;