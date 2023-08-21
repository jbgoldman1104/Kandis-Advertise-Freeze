declare module '*.module.scss';
declare module '*.module.sass';
declare module '*.module.css';
declare module '*.module.less';
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  const value: any;
  export default value;
}
declare module '*.mp4' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const content: any;
  export default content;
}