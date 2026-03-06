import React, { Component, } from 'react';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught:', error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return <h1>SOMETHING WENT WRONG!!</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;