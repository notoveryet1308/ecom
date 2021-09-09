import CarouselBanner from '../../components/CarouselBanner'
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
				</div>
      </div>
    `
	}

	afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		CarouselBanner.afterRender()
	}
}

export default Home
