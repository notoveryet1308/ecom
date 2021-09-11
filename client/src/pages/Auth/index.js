import Header from '../../components/Header'
import Login from '../../components/Login'
import MainNavigation from '../../components/MainNvigation'
import Signup from '../../components/Signup'
import './_style.scss'

class Auth {
	constructor(resource, params) {
		this.resource = resource
		this.params = params
		this.authType = {
			signup: Signup,
			login: Login,
		}
	}

	render() {
		this.AuthPage = this.authType[this.params.authType]
		return `
    <div class='auth-conatiner'>
      ${Header.render()}
      ${MainNavigation.render()}
      <div class='auth-content'>
        ${this.AuthPage.render()}
      </div>
    </div>`
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		this.AuthPage.afterRender()
	}
}

export default Auth
