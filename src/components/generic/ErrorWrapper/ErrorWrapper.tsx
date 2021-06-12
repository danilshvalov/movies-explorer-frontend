/* eslint-disable max-len */
import React from 'react';

export interface ErrorWrapperProps {
  fallback: JSX.Element;
}

export interface State {
  error: any;
  errorInfo: any;
}

class ErrorWrapper extends React.Component<ErrorWrapperProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  handleReset() {
    this.setState({error: null, errorInfo: null});
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return this.props.fallback;
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorWrapper;
