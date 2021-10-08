import { getUserByToken } from '../../API'
import Header from '../../components/Header'
import MainNavigation from '../../components/MainNvigation'
import UserInformation from '../../components/UserInformation'
import Loader from '../../components/generalUI/Loader'

import './_style.scss'

const selectedTabCSS = ({ selected }) => {
	const infoTab = document.querySelector('.userProfile__tab-info')
	const orderTab = document.querySelector('.userProfile__tab-orders')
	if (selected === 'user-info') {
		infoTab.classList.add('active-tab')
		orderTab.classList.remove('active-tab')
	}

	if (selected === 'user-orders') {
		orderTab.classList.add('active-tab')
		infoTab.classList.remove('active-tab')
	}
}

class UserProfile {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
	}

	async render() {
		return `
      <div class='userProfile'>
         ${Header.render()}
         ${MainNavigation.render()}
         <div class='userProfile-container main-content-wrapper'>
            <div class='userProfile__tab'>
              <p class='userProfile__tab-info profile-tab-btn active-tab' data-profile-tab='user-info'>Info</p>
              <p class='userProfile__tab-orders profile-tab-btn' data-profile-tab='user-orders'>orders</p>
            </div>
            <div class='userProfile-content'>
              <div class='userProfile-seectedTab'>
                ${Loader.render()}
              </div>
            </div>
         </div>
      </div>
    `
	}

	async afterRender() {
		Header.afterRender()
		MainNavigation.afterRender()
		const profileTabs = [...document.querySelectorAll('.profile-tab-btn')]
		const selectedContent = document.querySelector('.userProfile-seectedTab')

		const { _id, email, fullname } = await getUserByToken()
		if (_id) {
			selectedContent.innerHTML = null
			selectedContent.innerHTML = UserInformation.render({
				fullname,
				email,
			})
		}

		profileTabs.forEach((tabBtn) => {
			tabBtn.addEventListener('click', (e) => {
				const selected = e.target.getAttribute('data-profile-tab')
				selectedTabCSS({ selected })
			})
		})
	}
}

export default UserProfile
