/**
 * Async get request for a json api.
 * @param {string} url
 * // no catching because error checking is for the weak!
 */
export async function getData(url, header, body) {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${header.token}`
		}
	}).catch(err => console.error('Whoops, bad API Call!', url))
	const json = await response.json().catch(e => console.error(e))
	return json
}
