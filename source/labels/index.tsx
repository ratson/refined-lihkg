import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './ErrorBoundary'
import Labels from './Labels'

const extractProfileIdFromLink = (a: HTMLAnchorElement) => {
	const m = (a.getAttribute('href') || '').match(/\/profile\/(\d+)/)
	if (!m) {
		return null
	}
	return m[1]
}

export const onDOMNodeInserted = (e: Event) => {
	const insertedDiv = (e.target as HTMLDivElement) || null
	if (!insertedDiv || !insertedDiv.querySelectorAll) {
		return
	}

	insertedDiv.querySelectorAll('[data-post-id]').forEach(postDiv => {
		postDiv.querySelectorAll('div > small').forEach(metaDiv => {
			const a = metaDiv.querySelector('span > a[href^="/profile/"]')
			if (!a) {
				return
			}
			const profileId = extractProfileIdFromLink(a as HTMLAnchorElement) || '-'

			const labels = document.createElement('div')
			metaDiv.insertAdjacentElement('afterend', labels)
			ReactDOM.render(
				<ErrorBoundary>
					<React.Suspense fallback={<div />}>
						<Labels profileId={profileId} />
					</React.Suspense>
				</ErrorBoundary>,
				labels
			)
		})
	})
}
