import { createUseFetch } from 'fetch-suspense'
import React from 'react'
import styled from 'styled-components'

const useFetch = createUseFetch(
	// @ts-ignore
	typeof content !== 'undefined' ? content.fetch : fetch
)

const LabelsContainer = styled.div`
	font-size: 14px;
	margin-top: 2px;
`

const Labels: React.FC<{ profileId: string }> = ({ profileId }) => {
	const response = useFetch(
		'https://raw.githubusercontent.com/ratson/lihkg-data/master/labels.json'
	) as string
	const data = JSON.parse(response) as { [k: string]: Array<string> }

	return (
		<LabelsContainer>
			{(data[profileId] || []).map(s => (
				<div key={s}>{s}</div>
			))}
		</LabelsContainer>
	)
}

export default Labels
