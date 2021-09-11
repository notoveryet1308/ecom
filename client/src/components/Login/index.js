import { loginUser } from '../../API'
import login from '../../images/login.jpg'
import LocalStorage from '../../util/LocalStorage'
import './_style.scss'

const handleAuthInputLabel = ({ labelSelector, value }) => {
	const label = document.querySelector(labelSelector)
	if (value) {
		label.style.top = '0'
		label.style.fontSize = '1.4rem'
	} else {
		label.style.top = null
		label.style.fontSize = null
	}
}

const Login = {
	afterRender: async () => {
		const loginInputs = [...document.querySelectorAll('.login-input')]
		const loginBtn = document.querySelector('.login__submit-btn')
		let loginDetail = { email: null, password: null }
		loginInputs.forEach((node) => {
			node.addEventListener('input', (e) => {
				const { value, name } = e.target
				loginDetail = { ...loginDetail, [name]: value }
				handleAuthInputLabel({
					labelSelector: `.login-${name}Label`,
					value,
				})
			})
		})

		loginBtn.addEventListener('click', async () => {
      if (loginDetail.email && loginDetail.password) {
       const token = await loginUser({ loginDetail })
       LocalStorage.setItem('user-auth-token', token)
       window.location.replace('#/home')
      }
    })
	},
	render: () => `
      <div class ='login'>
       <div class='login-container'>
        <div class='login__graphics' style="background-image: linear-gradient(315deg, #20bf556b 0%, #01bbefb4 90%), url(${login})">
           <p class='login__graphics-title'>Login</p>
           <p class='login__graphics-description'>Get access to Orders, Cart and Profile.</p>
        </div>
        <div class='login__inputs'>
           <div class='auth__input-filed'>
             <label class='auth__input-filed--label login-emailLabel'>Enter Email Address</label>
             <input name='email' required class='auth-input login-email login-input' type='email' />
           </div>
           <div class='auth__input-filed'>
             <label class='auth__input-filed--label login-passwordLabel'>Your Password</label>
             <input name='password' required class='auth-input login-password login-input' type='password' />
           </div>
           <div class='login__forgotPassword'>
             <a href='#/account/forgot-password' class='login__forgotPassword-link'>Forgot Password ?</a>
           </div>
           <div class='login__submit'>
              <button class='login__submit-btn'>Login</button>
           </div>
           <div class='login__signup'>
             <a class='login__signup-link' href="#/account/signup">New to Zingg ? Create new accunt.</a>
           </div>
        </div>
       </div>
      </div>
    `,
}

export default Login
