const contentFetch: typeof fetch = (...args: any[]) =>
	// @ts-ignore
	typeof content !== 'undefined' ? content.fetch(...args) : fetch(...args)

export default contentFetch
