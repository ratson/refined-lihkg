import {
	FETCH_URL,
	FETCHED_URL,
	GET_PROFILE_ID_BY_THREAD,
	GOT_PROFILE_ID
} from './lib/messages'

const fetching: { [k: string]: true } = {}
const threads: { [k: string]: string } = {}

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
		case GET_PROFILE_ID_BY_THREAD:
			sendResponse({
				type: GOT_PROFILE_ID,
				profileId: threads[request.threadId]
			})
			break
	}
})
