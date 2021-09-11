import { getEveryDayDeal } from '../../API'
import { LinkButtonTertiary } from '../generalUI/Button'
import Loader from '../generalUI/Loader'
import './_style.scss'
import DisplayProuctCard from '../Cards/DisplayProduct'

import placeholder from '../../images/placeholder.jpg'

const FeatureProducts = {
	afterRender: async () => {
		const productListContainer = document.querySelector('.featureProduct__list')
		const productList = await getEveryDayDeal()
		if (productList.length) {
			productListContainer.innerHTML = null
			productListContainer.insertAdjacentHTML(
				'beforeend',
				productList
					.map((data) => {
						console.log({ data })
						return DisplayProuctCard.render({
							id: data.productId,
							price: data.product.price,
							productType: data.product.type,
							name: data.product.name,
							brand: data.product.brand,
							image: placeholder,
							discountPrice: data.product.discountPrice,
						})
					})
					.join('\n'),
			)
		}
	},
	render: () => `
        <section class='featureProduct-container'>
          <div class='featureProduct-content'>
            <div class='featureProduct__label'>
              <p class='featureProduct__label-text'>Deals of the day</p>
              ${LinkButtonTertiary.render({ to: '#', display: 'View All' })}
            </div>
            <div class='featureProduct__list'>
              ${Loader.render()}
            </div>
          </div>
        </section>
      `,
}

export default FeatureProducts
