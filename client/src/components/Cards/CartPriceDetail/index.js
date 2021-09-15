import './_style.scss'

const CartPriceDetail = {
	render: ({ cartData }) => {
		const cartInfoData = [...cartData]
		const { itemCount, totalPrice, totalDiscount } = cartInfoData.reduce(
			(prev, curr) => {
				prev = {
					...prev,
					itemCount: prev.itemCount + 1,
					totalPrice: prev.totalPrice + curr.price,
					totalDiscount: prev.totalDiscount + curr.discountPrice,
				}
				return prev
			},
			{ itemCount: null, totalPrice: null, totalDiscount: null },
		)
		return `
    <div class='cartPriceDetail'>
      <p class='cartPriceDetail-label'>Price Details</p>
      <div class='cartPriceDetail-infoWrapper'>
        <div class='cartPriceDetail-info'>
          <div class='cartPriceDetail__totalPrice p-Box'>
            <p class='cartPriceDetail__totalPrice-label'>Price(${itemCount})</p>
            <p class='cartPriceDetail__totalPrice-value'>
            ₹${totalPrice}</p>
          </div>
          <div class='cartPriceDetail__totalDiscount p-Box'>
            <p class='cartPriceDetail__totalDiscount-label'>Discount</p>
            <p class='cartPriceDetail__totalDiscount-value'>
            − ₹${totalPrice - totalDiscount}</p>
          </div> 
          <div class='cartPriceDetail__amountToPay p-Box'>
            <p class='cartPriceDetail__amountToPay-label'>Total Amount</p>
            <p class='cartPriceDetail__amountToPay-value'>
            ₹${totalDiscount}</p>
          </div>
        </div>
      </div>
    </div>
  `
	},
}

export default CartPriceDetail
