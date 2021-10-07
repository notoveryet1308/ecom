import axios from 'axios'
import LocalStorage from '../util/LocalStorage'

const baseUrl =
  document.domain === 'infinite-peak-84010.herokuapp.com'
    ? 'https://infinite-peak-84010.herokuapp.com/api/v1'
    : 'http://localhost:4000/api/v1' 

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
	const response = await axios.post(`${baseUrl}/user/signup`, {
		...signupDetail,
	})
	if (response.data.status === 'success') {
		return response.data.token
	}
	return response.data
}

const getClothingProduct = async ({ params }) => {
	const response = await axios.get(`${baseUrl}/clothing`, {
		params: { ...params },
	})
	if (response.data.status === 'success') {
		return response.data.data.products
	}
	return response.data
}

const getProductDetail = async ({ params }) => {
	const response = await axios.get(
		`${baseUrl}/product/${params.productType}/${params.id}`,
	)
	if (response.data.status === 'success') {
		return response.data.data.product
	}
	return response.data
}

export const getUserByToken = async () => {
	const token = JSON.parse(LocalStorage.getItem('user-auth-token'))

	const response = await axios.get(`${baseUrl}/user/verify`, {
		params: {
			token,
		},
	})
	if (response.data.status === 'success') {
		return response.data.data
	}
	return response.data
}

const autoSuggestionData = async (value) => {
	const response = await axios.get(
		`${baseUrl}/autoSuggestion`,
		{
			params: { searchTerm: value },
		},
	)
	if (response.data.status === 'success') {
		return response.data.data.suggestionList
	}
	return response.data
}

const getPaymentDetail = async (
	amount = '500',
	user = { fullname: 'Rahul Raj', email: 'rahulraz1308@gmail.com' },
) => {
	const response = await axios.post(`${baseUrl}/payment`, {
		amount,
		fullname: user.fullname,
		email: user.email,
	})

	if (response.data.status === 'success') {
		return response.data.data
	}
	return response.data
}

export {
	getEveryDayDeal,
	loginUser,
	signupUser,
	getClothingProduct,
	getProductDetail,
	autoSuggestionData,
	getPaymentDetail,
}
