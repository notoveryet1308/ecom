class LocalStorage {
	static setItem(key, value) {
		localStorage.setItem(key, value)
	}

	static getItem(key) {
		const data = localStorage.getItem(key)
		return data
	}

	static removeItem(key) {
		localStorage.removeItem(key)
	}
}

export default LocalStorage
