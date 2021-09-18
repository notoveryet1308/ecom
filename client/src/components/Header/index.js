import LocalStorage from '../../util/LocalStorage'
import { AutocompleteSearch2 } from '../Autocompelete'
import { LinkButtonPrimary, LinkIconButton } from '../generalUI/Button'
import DropdownBtn from '../generalUI/Button/Dropdown'
import Logo from '../generalUI/logo'
import './_style.scss'

const logoutUser = () => {
	LocalStorage.removeItem('user-auth-token')
	window.location.reload()
}
const AutocompeleteSearchMob = new AutocompleteSearch2('mobile')
const AutocompeleteSearchNonMob = new AutocompleteSearch2('nonMobile')
const ProfileDropdownMob = new DropdownBtn('profileDropdownMob', [
	{
		id: 'myprofileMOB',
		display: 'My Profile',
		onClick: () => window.location.replace('#/profile'),
	},
	{
		id: 'logoutUserMOB',
		display: 'Logout',
		onClick: logoutUser,
	},
])
const ProfileDropdownNonMob = new DropdownBtn('profileDropdownNonMob', [
	{
		id: 'myprofileNONMOB',
		display: 'My Profile',
		onClick: () => window.location.replace('#/profile'),
	},
	{
		id: 'logoutUserNONMOB',
		display: 'Logout',
		onClick: logoutUser,
	},
])

const Header = {
	afterRender: () => {
		const isLoggedIn = LocalStorage.getItem('user-auth-token')
		AutocompeleteSearchMob.afterRender()
		AutocompeleteSearchNonMob.afterRender()

		if (isLoggedIn) {
			ProfileDropdownMob.afterRender()
			ProfileDropdownNonMob.afterRender()
		}
	},
	render: () => {
		const isLoggedIn = LocalStorage.getItem('user-auth-token')
		return `
    <header class='header-container'>
      <div class="header__mobile">
        <div class="header__mobile-top">
           ${Logo.render()}
           <div class='header__action'>
              <div class='login-or-profile__outerWrapper'>
                 ${
										!isLoggedIn
											? LinkButtonPrimary.render({
													to: '/account/login',
													display: 'Login',
											  })
											: ProfileDropdownMob.render({
													display: 'Profile',
													icon: 'user-circle',
											  })
									}
              </div> 
              <div class='cart__outerWrapper'>
                  ${LinkIconButton.render({
										to: '/viewCart',
										display: 'Cart',
										icon: 'shopping-cart',
									})}
              </div>
            </div>
        </div>
        <div class='autocomplete__outerWrapper'>
          ${AutocompeleteSearchMob.render()}
        </div>
      </div>
      
     
     <div class="header__non-mobile">
        ${Logo.render()}
        <div class='autocomplete__outerWrapper'>
          ${AutocompeleteSearchNonMob.render()}
        </div>
        <div class='header__action'>
          <div class='login-or-profile__outerWrapper'>
            ${
							!isLoggedIn
								? LinkButtonPrimary.render({
										to: '/account/login',
										display: 'Login',
								  })
								: ProfileDropdownNonMob.render({
										display: 'Profile',
										icon: 'user-circle',
								  })
						}
          </div> 
          <div class='cart__outerWrapper'>
              ${LinkIconButton.render({
								to: '/viewCart',
								display: 'Cart',
								icon: 'shopping-cart',
							})}
          </div>
        </div>
     </div>
    </header>
    `
	},
}

export default Header
