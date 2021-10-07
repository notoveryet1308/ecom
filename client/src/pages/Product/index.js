import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import { images } from '../../data'
import { calculatePercentage } from '../../util/functions'
import LocalStorage from '../../util/LocalStorage'
import './_style.scss'

const keyValuePair = ({ identifier, label, description }) => `
   <div class='keyvaluepair-${identifier} keyvaluepair'>
     <p class='keyvaluepair-key'>${label}</p>
     <p class='keyvaluepair-value'>${description}</p>
   </div>  
  `

const showPropertyValue = ({ display, value, inStock }) => `
  <div class='showPropertyValue ${
		inStock ? 'product-available' : ''
	}' data-property-type="display:${display},value:${value}">
    <p class='showPropertyValue-value'>${value}</p>
    <p class='showPropertyValue-display'>${display}</p>
  </div>
`

const showProperty = ({ identifier, propertyName, values }) => `
  <div class='showProperty--${identifier}'>
     <p class='showProperty-name'>${propertyName}</p>
     <div class='showProperty-values'>
        ${values.map((el) => showPropertyValue({ ...el })).join('\n')}
     </div>
  </div>
`

class Product {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
		this.userInput = {}
		this.cartItems = [LocalStorage.getItem('cart-items') ? LocalStorage.getItem('cart-items'): '']
	}

	async render() {
		const product = await this.apiCall({ params: this.params })
		if (product) {
			this.apiResponse = product
		}
		const {
			_id,
			name,
			imageUrl,
			brand,
			price,
			discountPrice,
			productDetail,
			availableSize,
		} = this.apiResponse
		const offPercentage = calculatePercentage(price, discountPrice)
		const inCart = this.cartItems.some((el) => el._id === _id)
		const userLogged = LocalStorage.getItem('user-auth-token')
		return `
      <div class='product'>
        ${Header.render()}
        ${MainNavigation.render()}
        <div class='product-content'>
          <div class='product__graphics'>
            <div class='product__graphics-image'>
              <img src='${images[imageUrl]}' />
            </div>
            <div class='product__graphics-actions'>
              <div class='product-addToCart product-action-btn'>
							  <a  class='addToCart-btn' data-inCart= '${inCart}'>
							    <i class="ph-shopping-cart-fill btn-icon"></i>
							    <span>${inCart ? 'Go To Cart' : 'Add To Cart'}</span>
						    </a>
              </div>
              <div class='product-buyNow product-action-btn'>
                <a href="#/${
									userLogged ? 'checkout' : 'account/login'
								}" class='buyNow-btn'>
                  <i class="ph-lightning-fill"></i>
                  <span>Buy Now</span>
                </a>
              </div>
            </div>
          </div>
          <div class='product__details'>
             <p class='product-brandName'>${brand}</p>
             <p class='product-productName'>${name}</p>
             <div class='product-priceDetail'>
                <p class='product-discountPrice'>${
									discountPrice ? `₹${discountPrice}` : ''
								}</p>
                <p class='product-price ${
									discountPrice ? 'product-inOffer' : ''
								}'>₹${price}</p>
                <p class='product-offerPercentage'>${
									discountPrice ? `${offPercentage}% off` : ''
								}</p>
              </div>
              <div class='product-rating'>
                <p class='product-rating-value'>
                  <span>4.5</span>
                  <i class="ph-star-fill"></i>
                </p>
                <p class="product-rating-count">
                 8 ratings and 0 review
                </p>
              </div>
              <div class='product-availableSize'>
                 ${showProperty({
										propertyName: 'Size',
										identifier: 'availableSize',
										values: availableSize,
									})}
              </div>
              <div class='product-detail'>
                <p class='product-detail---title'>Product Detail</p>
                ${productDetail
									.map((el) =>
										keyValuePair({ ...el, identifier: 'product-detail' }),
									)
									.join('\n')}
              </div>
          </div>
        </div>
      </div>
    `
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		const addToCartBtn = document.querySelector('.addToCart-btn')
		const sizeNode = [
			...document.querySelectorAll(
				'.showProperty--availableSize .showPropertyValue',
			),
		]
		sizeNode.map((node) => {
			node.addEventListener('click', (e) => {
				e.target.style.border = '2px solid green'
				const selectedSize = {}
				const dataValue = e.target.getAttribute('data-property-type').split(',')
				dataValue.map((el) => {
					const propetry = el.split(':')
					selectedSize[propetry[0]] = propetry[1]
					return null
				})

				this.userInput = { ...this.userInput, selectedSize }
				let nextSibling = e.target.nextElementSibling
				let prevSibling = e.target.previousElementSibling
				while (nextSibling || prevSibling) {
					if (nextSibling) {
						nextSibling.style.border = '2px solid #e5e5e5'
						nextSibling = nextSibling.nextElementSibling
					}
					if (prevSibling) {
						prevSibling.style.border = '2px solid #e5e5e5'
						prevSibling = prevSibling.previousElementSibling
					}
				}
			})
			return null
		})

		addToCartBtn.addEventListener('click', (e) => {
			const inCart = e.target.getAttribute('data-inCart')
			const cartItems = LocalStorage.getItem('cart-items')

			if (inCart === 'true') {
				e.target.href = '#/viewCart'
				return null
			}

			if (inCart === 'false' && !this.userInput.selectedSize) {
				alert('Select size')
			} else if (inCart === 'false' && cartItems && cartItems.length) {
				cartItems.push({
					...this.apiResponse,
					selectedSize: this.userInput.selectedSize,
				})
				LocalStorage.setItem('cart-items', cartItems)
				e.target.href = '#/viewCart'
			} else {
				LocalStorage.setItem('cart-items', [
					{ ...this.apiResponse, selectedSize: this.userInput.selectedSize },
				])
				e.target.href = '#/viewCart'
			}
		})
	}
}

export default Product
