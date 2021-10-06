import { getPaymentDetail } from '../API'

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
// amount: 100000
// amount_due: 100000
// amount_paid: 0
// attempts: 0
// created_at: 1633523885
// currency: "INR"
// email: "rahulraz1308@gmail.com"
// entity: "order"
// fullname: "Rahul Raj"
// id: "order_I63NHNFh0cUDep"
// notes: []
// offer_id: null
// receipt: "cBA77SCqjKedjDRtHQdsZ"
// status: "created"

const displayRazorpay = async ({ totalAmount }) => {
	const { amount, currency, email, id, fullname } = await getPaymentDetail(
		totalAmount,
	)

	const options = {
		key: 'rzp_test_PguAUXdCDnlU6o',
		amount,
		currency,
		name: 'Zingg Cart',
		description: 'Test Transaction',
		image: 'https://example.com/your_logo',
		order_id: id,
		handler: function handler(response) {
			// alert(response.razorpay_payment_id)
			// alert(response.razorpay_order_id)
			// alert(response.razorpay_signature)
			if (response.razorpay_payment_id) {
				alert('ORDER PLACED !!')
				window.location.href = '#/home'
			}
		},
		prefill: {
			name: fullname,
			email,
			contact: '8146828470',
		},
		notes: {
			address: 'Razorpay Corporate Office',
		},
		theme: {
			color: '#3399cc',
		},
	}
	const rzp1 = new window.Razorpay(options)
	rzp1.open()
}

const loadRazorpay = async ({ amount }) => {
	const script = document.createElement('script')
	script.src = 'https://checkout.razorpay.com/v1/checkout.js'
	document.body.appendChild(script)
	script.onload = await displayRazorpay({ totalAmount: amount })
}
export { calculatePercentage, debounce, loadRazorpay }
