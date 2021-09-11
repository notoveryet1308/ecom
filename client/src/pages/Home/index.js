import { getEveryDayDeal, getClothingProduct } from '../../API'
import CarouselBanner from '../../components/CarouselBanner'
import FeatureProducts from '../../components/FeatureProducts'
import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import './_style.scss'

const FeautureProductInOffer = new FeatureProducts(
	getEveryDayDeal,
	{},
	'inOffer',
)
const FeatureProductFootwear = new FeatureProducts(
	getClothingProduct,
	{
		subCategory: 'footwear',
	},
	'footwear',
)

class Home {
	constructor(resource, params) {
		this.resource = resource
		this.params = params
	}

	render() {
		return `
      <div class='home-container'>
        ${Header.render()}
				${MainNavigation.render()}
				<div class='home-content'>
				   ${CarouselBanner.render()}
					 ${FeautureProductInOffer.render({ featureTitle: 'Deal of the day' })}
					 ${FeatureProductFootwear.render({ featureTitle: 'Footwear' })}
				</div>
      </div>
    `
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		CarouselBanner.afterRender()
		await FeautureProductInOffer.afterRender()
		await FeatureProductFootwear.afterRender()
	}
}

export default Home
