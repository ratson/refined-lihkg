import fetch from './lib/fetch'
import {
	FETCHED_URL,
	FETCH_URL,
	GET_LABELS_BY_PROFILE,
	GET_LABELS_BY_THREAD,
	GET_PROFILE_ID_BY_THREAD,
	GOT_LABELS,
	GOT_PROFILE_ID
} from './lib/messages'

const labels: { [k: string]: Array<string> } = {}
const fetching: { [k: string]: true } = {}
const threads: { [k: string]: string } = {}

const fetchLabels = async () =>
	fetch(
		'https://raw.githubusercontent.com/ratson/lihkg-data/master/labels.json'
	).then(resp => resp.json())

const resolveLabels = (profileId?: string) => {
	if (!profileId) {
		return []
	}

	const profileLabels = labels[profileId] || []
	if (+profileId < 150000) {
		profileLabels.unshift(`ID<${Math.floor(+profileId / 1000) + 1}k`)
	}

	return profileLabels
}

chrome.runtime.onStartup.addListener(() => {
	fetchLabels().then(data => Object.assign(labels, data))
})

chrome.webRequest.onCompleted.addListener(
	details => {
		if (fetching[details.url]) {
			return
		}
		fetching[details.url] = true
		chrome.tabs.sendMessage(details.tabId, {
			type: FETCH_URL,
			url: details.url
		})
	},
	{
		urls: [
			'https://lihkg.com/api_v2/thread/category*',
			'https://lihkg.com/api_v2/user/*/thread*'
		]
	}
)

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	switch (request.type) {
		case FETCHED_URL:
			delete fetching[request.url]
			request.data.response.items.forEach(
				(item: { thread_id: string; user_id: string }) => {
					threads[item.thread_id] = item.user_id
				}
			)
			console.log(threads)
			break
		case GET_LABELS_BY_PROFILE:
			sendResponse({
				type: GOT_LABELS,
				labels: resolveLabels(request.profileId)
			})
			break
		case GET_LABELS_BY_THREAD:
			sendResponse({
				type: GOT_LABELS,
				labels: resolveLabels(threads[request.threadId])
			})
			break
		case GET_PROFILE_ID_BY_THREAD:
			sendResponse({
				type: GOT_PROFILE_ID,
				profileId: threads[request.threadId]
			})
			break
	}
})
