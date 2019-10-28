import React from 'react'
import styled from 'styled-components'
import { useLabelsByProfileId, useLabelsByThreadId } from './useLabels'

const LabelsContainer = styled.div`
	font-size: 14px;
	margin-top: 2px;
`

const Label = styled.div`
	display: inline-block;
	margin-right: 4px;
`

const LabelsRow: React.FC<{ labels: string[] }> = ({ labels }) => {
	return (
		<LabelsContainer>
			{labels.map(s => (
				<Label key={s}>{s}</Label>
			))}
		</LabelsContainer>
	)
}

export const ProfileLabels: React.FC<{ profileId: string }> = ({
	profileId
}) => {
	const labels = useLabelsByProfileId(profileId)
	return <LabelsRow labels={labels} />
}

export const ThreadLabels: React.FC<{ threadId: string }> = ({ threadId }) => {
	const labels = useLabelsByThreadId(threadId)
	return <LabelsRow labels={labels} />
}
