export async function deleteData(url) {
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).catch(e => console.error(e))
	const json = await response.json().catch(e => console.error(e))
	return json
	// if it doesn't fail
}
