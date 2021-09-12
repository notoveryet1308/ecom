import LocalStorage from '../../../util/LocalStorage'
import './_style.scss'

const LinkButtonPrimary = {
	render: ({ to, display }) => `
    <div class='button-container'>
      <a href='#${to}' class='linkButton linkButton-Primary button'>${display}</a>
    </div>
  `,
}

const LinkButtonTertiary = {
	render: ({ to, display }) => `
    <div class='button-container'>
      <a href='#${to}' class='linkButton linkButton-Tertiary button'>${display}</a>
    </div>
  `,
}

const LinkIconButton = {
	render: ({ to, display, icon }) => {
		const isLoggedIn = LocalStorage.getItem('user-auth-token')
		return `
      <div class='button-container'>
        <a href='#${to}' class='linkButton linkIconButton'>
          <i class="ph-${icon} ${isLoggedIn ? 'user-logged-in' : ''} icon"></i>
          ${display}
        </a>
     </div>
  `
	},
}
class LinkIconBtn {
	constructor(identifier) {
		this.identifier = identifier
	}

	render({ to, display, icon }) {
		const isLoggedIn = LocalStorage.getItem('user-auth-token')
		return `
    <div class='button-container'>
        <a href='#${to}' class='linkButton linkIconButton'>
          <i class="ph-${icon} ${isLoggedIn ? 'user-logged-in' : ''} icon"></i>
          ${display}
        </a>
     </div>
    `
	}
}

export { LinkButtonPrimary, LinkIconButton, LinkButtonTertiary, LinkIconBtn }
