import { onDOMNodeInserted } from './labels'
import fetch from './lib/fetch'
import { FETCHED_URL, FETCH_URL } from './lib/messages'

const onDOMContentLoaded = () => {
	const app = document.getElementById('app')
	if (!app) {
		return
	}
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false)
document.addEventListener('DOMNodeInserted', onDOMNodeInserted, false)

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
	if (request.type === FETCH_URL) {
		const { url } = request
		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				chrome.runtime.sendMessage({ type: FETCHED_URL, url, data })
			})
	}
})
