import { JSX } from 'react';
import GeneralLoading from '../GeneralLoading';
import NoMatch from '../noMatch';

function withConditionalRender<Props>(Component: React.FC<Props>) {
  return function WrappedComponent({
    isLoading = false,
    noMatch = false,
    ...rest
  }: Props & { isLoading?: boolean; noMatch?: boolean }) {
    if (isLoading) return <GeneralLoading />;
    if (noMatch) return <NoMatch />;
    return <Component {...(rest as JSX.IntrinsicAttributes & Props)} />; // eslint-disable-line react/jsx-props-no-spreading
  };
}

export default withConditionalRender;
