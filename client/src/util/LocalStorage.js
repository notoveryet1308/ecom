class LocalStorage {
	static setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	static getItem(key) {
		let data = localStorage.getItem(key)
		if(data && data.startsWith('[') ){
      data = JSON.parse(data)
		}
		return data
	}

	static removeItem(key) {
		localStorage.removeItem(key)
	}
}

export default LocalStorage
