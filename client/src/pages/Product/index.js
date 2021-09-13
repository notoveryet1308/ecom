import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import { images } from '../../data'
import calculatePercentage from '../../util/functions'
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
	}' data-property-type="${{ display, value, inStock }}">
    <p class='showPropertyValue-value'>${value}</p>
    <p class='showPropertyValue-display'>${display}</p>
  </div>
`

const showProperty = ({ identifier, propertyName, values }) => `
  <div class='showProperty-${identifier}'>
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
	}

	async render() {
		const product = await this.apiCall({ params: this.params })
		console.log({ product })
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
	}
}

export default Product
