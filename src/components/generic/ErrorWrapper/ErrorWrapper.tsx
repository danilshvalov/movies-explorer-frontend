// eslint-disable-next-line typescript-eslint/no-unused-vars
import {createCn} from 'bem-react-classname';
import React from 'react';

export interface ErrorWrapperProps {
  fallback: JSX.Element;
}

class ErrorWrapper extends React.Component<ErrorWrapperProps> {
  state = {hasError: false, error: null};

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorWrapper;
