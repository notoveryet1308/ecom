import CartProduct from '../../components/Cards/CartProduct'
import Header from '../../components/Header'
import LocalStorage from '../../util/LocalStorage'
import './_style.scss'

class Cart {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
	}

	render() {
		const cartItems = LocalStorage.getItem('cart-items')
		console.log({ cartItems })
		return `
      <div class='cart'>
        ${Header.render()}
        <div class='cart-container'>
          <div class='cart-content'>
            ${cartItems.map((data) => CartProduct.render({ ...data }))}
          </div>
        </div>
      </div>
    `
	}

	afterRender() {
		Header.afterRender()
	}
}

export default Cart
