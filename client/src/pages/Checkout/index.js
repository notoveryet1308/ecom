import CartProduct from '../../components/Cards/CartProduct'
import Header from '../../components/Header'
import { loadRazorpay } from '../../util/functions'
import LocalStorage from '../../util/LocalStorage'
import './_style.scss'

class Checkout {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
		this.cartItems = LocalStorage.getItem('cart-items') ?  [...LocalStorage.getItem('cart-items')]: []
	}

	render() {
		return `
      <div class='checkout'>
        ${Header.render()}
        <div class='checkout-container'>
           <div class='checkout-content'>
              <div class='checkout__orderSummary checkout-box'>
                <p class='checkout__orderSummary-label checkout-box-label'>Order Summary</p>
                <div class='checkout-box-content'>
                   ${
											this.cartItems.length
												? this.cartItems
														.map((data) =>
															CartProduct.render({
																...data,
																hideReomveBtn: true,
															}),
														)
														.join('\n')
												: ''
										}
                </div>
              </div>
              <div class='checkout__payment checkout-box'>
                <div class='checkout-box__sticky'>
                  <p class='checkout__payment-label checkout-box-label'>Payment</p>
                  <div class='checkout-box-content'>
                     <button class='checkout__payment-btn'>
										   Order
										 </button>
                   </div>
                </div>
            </div>
           </div>
        </div>
      </div>
    `
	}

	afterRender() {
		Header.afterRender()
	}
}

export default Checkout

{
	/* <div class='checkout__address checkout-box'>
<p class='checkout__address-label checkout-box-label'>Delivery Address</p>
<div class='checkout-box-content'>
</div>
</div> */
}
