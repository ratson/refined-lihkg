import React from 'react'
import Labels from './Labels'
import { GET_PROFILE_ID_BY_THREAD } from '../lib/messages'

const ThreadLabels: React.FC<{ threadId: string }> = ({ threadId }) => {
	const [profileId, setProfileId] = React.useState<string | null>(null)
	React.useEffect(() => {
		const timerId = setInterval(() => {
			chrome.runtime.sendMessage(
				{ type: GET_PROFILE_ID_BY_THREAD, threadId },
				payload => {
					if (!payload || !payload.profileId) {
						return
					}
					setProfileId(payload.profileId)
					clearInterval(timerId)
				}
			)
		}, 1000)

		return () => {
			clearInterval(timerId)
		}
	}, [threadId])

	if (!profileId) {
		return null
	}

	return <Labels profileId={profileId} />
}

export default ThreadLabels
