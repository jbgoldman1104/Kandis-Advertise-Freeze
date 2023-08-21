import { FC } from 'react';
import { StyledToolTip } from './styles'
import { ReactComponent as IcToolTip } from '../../assets/icons/ic_tooltip.svg';

interface ToolTipProps {
	title: string
}

const ToolTip: FC<ToolTipProps> = ({ title }) => {
	return (
		<StyledToolTip title={title}>
			<IcToolTip />
		</StyledToolTip>
	);
};

export default ToolTip;