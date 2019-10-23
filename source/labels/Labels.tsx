import React from 'react'
import styled from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import useLabels from './useLabels'

const LabelsContainer = styled.div`
	font-size: 14px;
	margin-top: 2px;
`

const LabelsRow: React.FC<{ profileId: string }> = ({ profileId }) => {
	const labels = useLabels()

	return (
		<LabelsContainer>
			{(labels[profileId] || []).map(s => (
				<div key={s}>{s}</div>
			))}
		</LabelsContainer>
	)
}

const Labels: React.FC<{ profileId: string }> = ({ profileId }) => {
	return (
		<ErrorBoundary>
			<React.Suspense fallback={<div />}>
				<LabelsRow profileId={profileId} />
			</React.Suspense>
		</ErrorBoundary>
	)
}

export default Labels
