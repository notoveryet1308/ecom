const calculatePercentage = (total, amount) => {
	const percentage = parseInt(((total - amount) / total) * 100)
	return percentage
}

export default calculatePercentage
