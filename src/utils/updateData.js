export async function putData(url, data) {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).catch(e => console.error(e))
	const json = await response.json().catch(e => console.error(e))
	return json
}
