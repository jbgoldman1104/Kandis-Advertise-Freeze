import {ReactNode, FC} from "react";
import styles from './Wrapper.module.scss'


interface WrapperProps {
  children?: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default Wrapper;