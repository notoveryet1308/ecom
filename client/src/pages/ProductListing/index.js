import { getClothingProduct } from '../../API'
import DisplayProduct from '../../components/Cards/DisplayProduct'
import Loader from '../../components/generalUI/Loader'
import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import { images } from '../../data'

import './_style.scss'

class ProductListing {
	constructor(resource, params) {
		this.resource = resource
		this.params = params
	}

	async render() {
		return `
		  <div class='productListing'>
			  ${Header.render()}
				${MainNavigation.render()}
				<div class='productListing-content'>
				   <div class='productListing-filter'> 
					    <p class='productListing-filter--title'>Filters</p>
					    <div class='productListing-filter__content'>
							</div>
					 </div>
					 <div class='productListing-products'>
					    ${Loader.render()}
					 </div>
				</div>
			</div>
	  `
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		const productList = document.querySelector('.productListing-products')
		const products = await getClothingProduct({ params: this.params })
		if (products.length) {
			productList.innerHTML = null
			productList.style.display = 'grid'
			productList.innerHTML = products
				.map((el) => {
					const { _id, name, imageUrl, type, brand, price, discountPrice } = el
					return DisplayProduct.render({
						id: _id,
						imageUrl: images[imageUrl],
						name,
						productType: type,
						brand,
						price,
						discountPrice,
					})
				})
				.join('\n')
		} else {
			productList.innerHTML = null
			productList.innerHTML = '<h1> NO DATA FOUND, SORRY ! </h1>'
		}
	}
}

export default ProductListing
