import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

const razorpay = new Razorpay({
  key_id: 'rzp_test_PguAUXdCDnlU6o',
  key_secret: 'eyAuRbR4baIJ9skVP2OFmnq4',
})

const payment = async (req, res, next) => {
  const paymentCapture = 1
  const { amount, fullname, email } = req.body
  const currency = 'INR'
  const response = await razorpay.orders.create({
    amount: (amount * 100),
    currency,
    receipt: nanoid(),
    payment_capture: paymentCapture,
  })

  return res.status(200).json({
    status: 'success',
    data: { ...response, fullname, email },
  })
}

export default payment
