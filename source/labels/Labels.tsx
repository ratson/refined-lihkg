import React from 'react'
import styled from 'styled-components'
import useLabels from './useLabels'

const LabelsContainer = styled.div`
	font-size: 14px;
	margin-top: 2px;
`

const Labels: React.FC<{ profileId: string }> = ({ profileId }) => {
	const labels = useLabels()

	return (
		<LabelsContainer>
			{(labels[profileId] || []).map(s => (
				<div key={s}>{s}</div>
			))}
		</LabelsContainer>
	)
}

export default Labels
