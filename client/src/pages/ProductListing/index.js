import DisplayProduct from '../../components/Cards/DisplayProduct'
import Loader from '../../components/generalUI/Loader'
import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import { images } from '../../data'

import './_style.scss'

class ProductListing {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
	}

	async render() {
		return `
		  <div class='productListing'>
			  ${Header.render()}
				${MainNavigation.render()}
				<div class='productListing-content'>
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
		const products = await this.apiCall({ params: this.params })

		if (products.length) {
			productList.innerHTML = null
      if (innerWidth >= 500) {
        productList.style.display = 'grid'
      } else {
        productList.style.display = 'flex'
      }
      window.addEventListener('resize', () => {
        if (innerWidth >= 500) {
          productList.style.display = 'grid'
        } else {
          productList.style.display = 'flex'
        }
      })
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

{/* <div class='productListing-filter'> 
<p class='productListing-filter--title'>Filters</p>
<div class='productListing-filter__content'>
</div>
</div> */}