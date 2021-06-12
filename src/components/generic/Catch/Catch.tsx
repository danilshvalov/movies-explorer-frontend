import React from 'react';

export type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
export type ErrorHandlingComponent<Props> = React.ComponentType<Props & {error?: Error}>;

type ErrorState = {error?: Error};

export function Catch<Props>(
  Component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler,
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
      return {error};
    }

    // eslint-disable-next-line class-methods-use-this
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      return <Component {...this.props} error={this.state.error} />;
      // return component(this.props, this.state.error);
    }
  };
}

export default Catch;
