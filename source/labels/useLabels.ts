import React from 'react'
import {
	GET_LABELS_BY_PROFILE,
	GET_LABELS_BY_THREAD,
	GOT_LABELS
} from '../lib/messages'

const useLabels = (message: { type: string; [k: string]: any }) => {
	const [labels, setLabels] = React.useState<Array<string>>([])
	const [counter, setCounter] = React.useState(0)

	React.useEffect(() => {
		let timerId: number

		if (counter >= 60) {
			return
		}

		chrome.runtime.sendMessage(message, payload => {
			if (!payload || payload.type !== GOT_LABELS) {
				timerId = setTimeout(() => setCounter(counter + 1), 1000)
				return
			}
			setLabels(payload.labels)
		})

		return () => {
			clearTimeout(timerId)
		}
	}, [message, counter])

	return labels
}

export const useLabelsByProfileId = (profileId: string) => {
	const message = React.useMemo(
		() => ({ type: GET_LABELS_BY_PROFILE, profileId }),
		[profileId]
	)
	return useLabels(message)
}

export const useLabelsByThreadId = (threadId: string) => {
	const message = React.useMemo(
		() => ({ type: GET_LABELS_BY_THREAD, threadId }),
		[threadId]
	)
	return useLabels(message)
}
