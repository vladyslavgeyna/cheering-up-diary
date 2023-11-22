export function getLocalStorageItemAsync(key: string): Promise<string | null> {
	return new Promise((resolve, reject) => {
		try {
			const value = localStorage.getItem(key)
			resolve(value)
		} catch (error) {
			reject(error)
		}
	})
}
