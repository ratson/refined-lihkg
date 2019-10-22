import { createUseFetch } from 'fetch-suspense'
import fetch from '../lib/fetch'

const useFetch = createUseFetch(fetch)

export default () => {
	const response = useFetch(
		'https://raw.githubusercontent.com/ratson/lihkg-data/master/labels.json'
	) as string
	const data = JSON.parse(response) as { [k: string]: Array<string> }
	return data as { [k: string]: Array<string> }
}
