const calculatePercentage = (total, amount) => {
	const percentage = parseInt(((total - amount) / total) * 100)
	return percentage
}
const debounce = function (functionToBeDebounce, delay) {
	let timer
	let data
	return function (...args) {
		const context = this
		clearTimeout(timer)
		timer = setTimeout(async () => {
			data = await functionToBeDebounce.apply(context, args)
		}, delay)
		return data
	}
}

export { calculatePercentage, debounce }
