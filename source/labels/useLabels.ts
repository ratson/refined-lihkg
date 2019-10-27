import React from 'react'
import { GET_LABELS_BY_PROFILE, GOT_LABELS } from '../lib/messages'

export const useLabelsByProfileId = (profileId: string) => {
	const [labels, setLabels] = React.useState<Array<string>>([])
	const [counter, setCounter] = React.useState(0)

	React.useEffect(() => {
		let timerId: number

		if (counter >= 60) {
			return
		}

		chrome.runtime.sendMessage(
			{ type: GET_LABELS_BY_PROFILE, profileId },
			payload => {
				if (!payload || payload.type !== GOT_LABELS) {
					timerId = setTimeout(() => setCounter(counter + 1), 1000)
					return
				}
				setLabels(payload.labels)
			}
		)

		return () => {
			clearTimeout(timerId)
		}
	}, [profileId, counter])

	return labels
}
