import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import { images } from '../../data'
import calculatePercentage from '../../util/functions'
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
	}

	async render() {
		const product = await this.apiCall({ params: this.params })
		if (product) {
			this.apiResponse = product
		}
		const {
			name,
			imageUrl,
			brand,
			price,
			discountPrice,
			productDetail,
			availableSize,
		} = this.apiResponse
		const offPercentage = calculatePercentage(price, discountPrice)
		const isLoggedIn = LocalStorage.getItem('user-auth-token')
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
                <button class='addToCart-btn'>
                  <i class="ph-shopping-cart-fill btn-icon"></i>
                  <span>Add To Cart</span>
                </button>
              </div>
              <div class='product-buyNow product-action-btn'>
                <button class='buyNow-btn'>
                  <i class="ph-lightning-fill"></i>
                  <span>Buy Now</span>
                </button>
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

		addToCartBtn.addEventListener('click', () => {
			const cartItems = LocalStorage.getItem('cart-items')
			if (!this.userInput.selectedSize) {
				alert('Select size')
				return null
			}
			if (cartItems && cartItems.length) {
				cartItems.push({
					...this.apiResponse,
					selectedSize: this.userInput.selectedSize,
				})
				LocalStorage.setItem('cart-items', cartItems)
			} else {
				LocalStorage.setItem('cart-items', [
					{ ...this.apiResponse, selectedSize: this.userInput.selectedSize },
				])
			}
		})
	}
}

export default Product
