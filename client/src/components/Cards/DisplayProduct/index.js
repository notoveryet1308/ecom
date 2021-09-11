import './_style.scss'
// import img from '../../../images/carosuel-1.jpeg'
const calculatePercentage = (total, amount) => {
	const percentage = parseInt(((total - amount) / total) * 100)
	return percentage
}

const DisplayProduct = {
	render: ({ id, productType, name, imageUrl, brand, price, discountPrice }) => {
		const productName = name && name.split(' ').join('-').toLowerCase()

		const offPercentage =
			discountPrice && calculatePercentage(price, discountPrice)
		return `<div class='displayProduct'>
        <a href='#/${productType}/${productName}/${id}' class='displayProduct__content'>
          <div class='displayProduct__image'>
            <img src='${imageUrl}' alt='${name}-pic' />
          </div>
          <div class='displayProduct__detail'>
            <p class='displayProduct-brand'>${brand}</p>
            <p class='displayProduct-name'>${name}</p>
            <div class='product-priceDetail'>
              <p class='displayProduct-discountPrice'>₹${
								discountPrice ? discountPrice : ''
							}</p>
              <p class='displayProduct-price ${
								discountPrice ? 'inOffer' : ''
							}'>₹${price}</p>
              <p class='displayProduct-offer'>
               ${offPercentage ? offPercentage : ''}${
			offPercentage ? '% off' : ''
		}
              </p>
            </div>
          </div>        
        </a>
      </div>    
  `
	},
}

export default DisplayProduct
