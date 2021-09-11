import LocalStorage from '../../util/LocalStorage'
import AutocompleteSearch from '../Autocompelete'
import { LinkButtonPrimary, LinkIconButton } from '../generalUI/Button'
import Logo from '../generalUI/logo'
import Language from '../Language'

import './_style.scss'

const Header = {
	afterRender: () => {
		AutocompleteSearch.afterRender()
	},
	render: () => {
  const isLoggedIn = LocalStorage.getItem('user-auth-token')
  return `
    <header class='header-container'>
     ${Logo.render()}
     <div class='autocomplete__outerWrapper'>
      ${AutocompleteSearch.render()}
     </div>
     <div class='header-action'>
      <div class='language__outerWrapper'>
        ${Language.render()}
      </div>
      <div class='header-action__nav'>
        <div class='login-or-profile__outerWrapper'>
          ${!isLoggedIn ? LinkButtonPrimary.render({ to: '/account/login', display: 'Login' }) : 'Profile'}
        </div> 
        <div class='cart__outerWrapper'>
          ${LinkIconButton.render({
						to: '/cart',
						display: 'Cart',
						icon: 'shopping-cart',
					})}
        </div>
      </div>
     </div> 
    </header>
    `},
}

export default Header
