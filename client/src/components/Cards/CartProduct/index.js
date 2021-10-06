import { calculatePercentage } from '../../../util/functions'
import { images } from '../../../data'
import './_style.scss'

const reomveBtn = (_id) => `
   <button class='cartProduct-remove-btn' data-product-id='${_id}'>
      REMOVE
   </button>
`

const CartProduct = {
	render: ({
		_id,
		brand,
		name,
		selectedSize,
		price,
		discountPrice,
		imageUrl,
		hideReomveBtn,
	}) => {
		const offPercentage = calculatePercentage(price, discountPrice)
		return `
    <div class='cartProduct' data-product-id='${_id}'>
      <div class='cartProduct__image'>
        <img src="${images[imageUrl]}" />
      </div>
      <div class="cartProduct__detail">
         <p class='cartProduct-brand'>${brand}</p>
         <p class='cartProduct-name'>${name}</p>
         <p class='cartProduct-size'>${
						selectedSize?.display ? `Size: ${selectedSize?.display}` : ''
					}</p>
         <div class='cartProduct-priceDetail'>
            <p class='cartProduct-discountPrice'>${
							discountPrice ? `₹${discountPrice}` : ''
						}</p>
            <p class='cartProduct-price ${
							discountPrice ? 'cartProduct-inOffer' : ''
						}'>₹${price}</p>
            <p class='cartProduct-offerPercentage'>${
							discountPrice ? `${offPercentage}% off` : ''
						}</p>
         </div>
         <div class='cartProduct-remove'>
             ${!hideReomveBtn ? reomveBtn(_id) : ''}
         </div>
      </div>
    </div>
  `
	},
}

export default CartProduct
