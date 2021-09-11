import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/v1'

const getEveryDayDeal = async () => {
	const response = await axios.get(`${baseUrl}/product/deal-of-the-day`)

	if (response.data.status === 'success') {
		return response.data.data
	}

	return response.data
}

const loginUser = async ({ loginDetail }) => {
  const response = await axios.post(`${baseUrl}/user/login`, { ...loginDetail })
	if (response.data.status === 'success') {
		return response.data.token
	}
	return response.data
}

const signupUser = async ({ signupDetail }) => {
	const response = await axios.post(`${baseUrl}/user/signup`, { ...signupDetail })
	if (response.data.status === 'success') {
		return response.data.token
	}
	return response.data
}

export { getEveryDayDeal, loginUser, signupUser }
