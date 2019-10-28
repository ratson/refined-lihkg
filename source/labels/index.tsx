import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './ErrorBoundary'
import { ProfileLabels, ThreadLabels } from './Labels'

const extractProfileIdFromLink = (a: HTMLAnchorElement) => {
	const m = (a.getAttribute('href') || '').match(/\/profile\/(\d+)/)
	if (!m) {
		return null
	}
	return m[1]
}

const extractThreadIdFromLink = (a: HTMLAnchorElement) => {
	const m = (a.getAttribute('href') || '').match(/\/thread\/(\d+)/)
	if (!m) {
		return null
	}
	return m[1]
}

const Container: React.FC = ({ children }) => (
	<ErrorBoundary>
		<React.Suspense fallback={<div />}>{children}</React.Suspense>
	</ErrorBoundary>
)

export const onDOMNodeInserted = (e: Event) => {
	const insertedDiv = (e.target as HTMLDivElement) || null
	if (!insertedDiv || !insertedDiv.querySelectorAll) {
		return
	}

	insertedDiv.querySelectorAll('a[href^="/thread/"]').forEach(threadA => {
		const threadId = extractThreadIdFromLink(threadA as HTMLAnchorElement)
		if (!threadId) {
			return
		}

		const titleDiv = threadA.parentNode as HTMLDivElement

		const labels = document.createElement('div')
		titleDiv.insertAdjacentElement('beforebegin', labels)
		ReactDOM.render(
			<Container>
				<ThreadLabels threadId={threadId} />
			</Container>,
			labels
		)
	})

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
				<Container>
					<ProfileLabels profileId={profileId} />
				</Container>,
				labels
			)
		})
	})
}
