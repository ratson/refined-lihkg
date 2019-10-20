import React from 'react'

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
	constructor(props: Readonly<{}>) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: any) {
		console.log(error)
		return { hasError: true }
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return null
		}

		return this.props.children
	}
}

export default ErrorBoundary
