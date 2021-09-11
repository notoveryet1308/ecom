import CarouselBanner from '../../components/CarouselBanner'
import FeatureProducts from '../../components/FeatureProducts'
import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import './_style.scss'

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
					 ${FeatureProducts.render()}
				</div>
      </div>
    `
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		CarouselBanner.afterRender()
		await FeatureProducts.afterRender()
	}
}

export default Home
