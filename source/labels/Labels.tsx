import React from 'react'
import styled from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import useLabels from './useLabels'

const LabelsContainer = styled.div`
	font-size: 14px;
	margin-top: 2px;
`

const Label = styled.div`
	display: inline-block;
	margin-right: 4px;
`

const LabelsRow: React.FC<{ profileId: string }> = ({ profileId }) => {
	const labels = useLabels()
	const profileLabels = labels[profileId] || []
	if (+profileId < 150000) {
		profileLabels.unshift(`ID<${Math.floor(+profileId / 1000) + 1}k`)
	}

	return (
		<LabelsContainer>
			{profileLabels.map(s => (
				<Label key={s}>{s}</Label>
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
