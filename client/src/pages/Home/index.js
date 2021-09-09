import Header from '../../components/Header'
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
      </div>
    `
	}

	afterRender() {
		Header.afterRender()
	}
}

export default Home
