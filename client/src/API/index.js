import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/v1'

const getEveryDayDeal = async () => {
	const response = await axios.get(`${baseUrl}/product/deal-of-the-day`)

	if (response.data.status === 'success') {
		return response.data.data
	}

	return response.data
}

export default getEveryDayDeal
