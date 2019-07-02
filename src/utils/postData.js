/**
 *
 * @param {string} url
 * @param {string} body Body as a string
 */
export async function postData(url, body) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	}).catch(e => console.error(e))
	const json = await response.json().catch(e => console.error(e))
	return json
}
