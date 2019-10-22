const contentFetch: typeof fetch =
	// @ts-ignore
	typeof content !== 'undefined' ? content.fetch : fetch

export default contentFetch
