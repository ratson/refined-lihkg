import React from 'react'
import ReactDOM from 'react-dom'
import Labels from './Labels'
import ThreadLabels from './ThreadLabels'

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
		ReactDOM.render(<ThreadLabels threadId={threadId} />, labels)
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
			ReactDOM.render(<Labels profileId={profileId} />, labels)
		})
	})
}
