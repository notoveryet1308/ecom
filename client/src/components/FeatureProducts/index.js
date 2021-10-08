import { LinkButtonTertiary } from '../generalUI/Button'
import Loader from '../generalUI/Loader'
import './_style.scss'
import DisplayProuctCard from '../Cards/DisplayProduct'
import { images } from '../../data'

class FeatureProducts {
	constructor(makeaApiRequest, params, identifier, href) {
		this.makeaApiRequest = makeaApiRequest
		this.params = params
		this.identifier = identifier
		this.href = href
	}

	render({ featureTitle }) {
		return `
		<section class='featureProduct-container'>
		  <div class='featureProduct-content'>
		  	<div class='featureProduct__label'>
			  	<p class='featureProduct__label-text'>${featureTitle}</p>
			  	${LinkButtonTertiary.render({ to: `${this.href}`, display: 'View All' })}
			  </div>
			  <div class='featureProduct__list featureProduct__list-${this.identifier}'>
				  ${Loader.render()}
			  </div>
		  </div>
	 </section>
	`
	}

	async afterRender() {
		const productListContainer = document.querySelector(
			`.featureProduct__list-${this.identifier}`,
		)
		let productList = await this.makeaApiRequest({ params: this.params })
		if (productList.length) {
			productList = productList.splice(1, 5)
			productListContainer.innerHTML = null
			if (innerWidth >= 500) {
        productListContainer.style.display = 'grid'
      } else {
        productListContainer.style.display = 'flex'
      }
      window.addEventListener('resize', () => {
        if (innerWidth >= 500) {
          productListContainer.style.display = 'grid'
        } else {
          productListContainer.style.display = 'flex'
        }
      })
			productListContainer.insertAdjacentHTML(
				'beforeend',
				productList
					.map((data) =>
						DisplayProuctCard.render({
							id: data._id,
							price: data.price,
							productType: data.type,
							name: data.name,
							brand: data.brand,
							imageUrl: images[data.imageUrl],
							discountPrice: data.discountPrice,
						}),
					)
					.join('\n'),
			)
		}
	}
}

export default FeatureProducts
