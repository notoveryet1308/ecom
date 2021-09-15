import CartPriceDetail from '../../components/Cards/CartPriceDetail'
import CartProduct from '../../components/Cards/CartProduct'
import Header from '../../components/Header'
import LocalStorage from '../../util/LocalStorage'
import './_style.scss'
import emptyCartImg from '../../images/cartEmpty.png'
import { LinkButtonPrimary } from '../../components/generalUI/Button'

const CartContent = {
	render: ({ cartItems }) => `
	<div class='cart-content'>
	${cartItems.map((data) => CartProduct.render({ ...data })).join('\n')}
  </div>
  <div class='cart-priceDetail'>
	  <div class='cart-priceDetail-sticky'>
		  <div class='cart-cartDetailCardWrapper'>
			  ${CartPriceDetail.render({ cartData: cartItems })}
		  </div>
		  <div class='cart__placeOrder'>
			 <button class='cart__placeOrder-btn'>
				 Place Order
				</button>
		  </div>
	 </div>
  </div>
	`,
}

const CartEmpty = {
	render: () => `
	  <div class='cartEmpty'>
		  <div class='cartEmpty__image'>
			  <img src="${emptyCartImg}" />
			</div>
			<p class='cartEmpty-info'>Your cart is empty. SHOP NOW !!</p>
			${LinkButtonPrimary.render({ to: '/home', display: 'Shop now' })}
		</div>
	`,
}

class Cart {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
		this.cartItems = [...LocalStorage.getItem('cart-items')]
	}

	render() {
		return `
      <div class='cart'>
        ${Header.render()}
        <div class='cart-container'>
           ${
							this.cartItems.length
								? CartContent.render({ cartItems: this.cartItems })
								: CartEmpty.render()
						}
        </div>
				
      </div>
    `
	}

	afterRender() {
		Header.afterRender()

		const cartContents = document.querySelector('.cart-content')
		const cartContainer = document.querySelector('.cart-container')
		const priceDetailCardWrapper = document.querySelector(
			'.cart-cartDetailCardWrapper',
		)
		let cartRemoveBtns = [
			...document.querySelectorAll('.cartProduct-remove-btn'),
		]

		window.addEventListener('click', (e) => {
			cartRemoveBtns.map((btnNode) => {
				if (btnNode === e.target) {
					const productID = e.target.getAttribute('data-product-id')
					const remainingItems = this.cartItems.filter(
						(item) => item._id !== productID,
					)
					LocalStorage.setItem('cart-items', remainingItems)
					this.cartItems = LocalStorage.getItem('cart-items')
					cartContents.innerHTML = null
					cartContents.insertAdjacentHTML(
						'beforeend',
						this.cartItems
							.map((data) => CartProduct.render({ ...data }))
							.join('\n'),
					)
					priceDetailCardWrapper.innerHTML = null
					if (this.cartItems.length) {
						priceDetailCardWrapper.insertAdjacentHTML(
							'beforeend',
							CartPriceDetail.render({ cartData: this.cartItems }),
						)
						cartRemoveBtns = [
							...document.querySelectorAll('.cartProduct-remove-btn'),
						]
					} else {
						cartContainer.innerHTML = null
						cartContainer.innerHTML = CartEmpty.render()
					}
				}
				return null
			})
		})
	}
}

export default Cart
