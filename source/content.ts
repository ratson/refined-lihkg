import { onDOMNodeInserted } from './labels'

const onDOMContentLoaded = () => {
	const app = document.getElementById('app')
	if (!app) {
		return
	}
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false)
document.addEventListener('DOMNodeInserted', onDOMNodeInserted, false)
