import login from '../../images/login.jpg'
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

const Signup = {
	afterRender: () => {
		const signupInputs = [...document.querySelectorAll('.auth-input')]
		let signupDetail = {
			email: null,
			name: null,
			password: null,
			confirmPassword: null,
		}

		const signupBtn = document.querySelector('.signup__submit-btn')

		signupInputs.forEach((node) => {
			node.addEventListener('input', (e) => {
				const { value, name } = e.target
				signupDetail = { ...signupDetail, [name]: value }
				handleAuthInputLabel({
					labelSelector: `.signup-${name}Label`,
					value,
				})
			})
		})

		signupBtn.addEventListener('click', (e) => {
			console.log({ signupDetail })
		})
	},

	render: () => `
    <div class='signup'>
      <div class='signup-container'>
        <div class='signup__graphics' style="background-image: linear-gradient(315deg, #20bf556b 0%, #01bbefb4 90%), url(${login})">
          <p class='signup__graphics-title'>Signup</p>
          <p class='signup__graphics-description'>Look like you're new here!. Signup with you email to get started.</p>
        </div>
        <div class='signup__inputs'>
           <div class='auth__input-filed'>
             <label class='auth__input-filed--label signup-nameLabel'>Enter your fullname</label>
             <input name='name' required class='auth-input signup-name signup-input' type='text' />
           </div>
           <div class='auth__input-filed'>
            <label class='auth__input-filed--label signup-emailLabel'>Enter Email Address</label>
            <input name='email' required class='auth-input signup-email signup-input' type='email' />
           </div>
           <div class='auth__input-filed'>
              <label class='auth__input-filed--label signup-passwordLabel'>Enter password</label>
              <input name='password' required class='auth-input signup-password signup-input' type='password' />
           </div>
           <div class='auth__input-filed'>
              <label class='auth__input-filed--label signup-confirmPasswordLabel'>Confirm password</label>
              <input name='confirmPassword' required class='auth-input signup-pasword signup-input' type='text' />
           </div>
           <div class='signup__submit'>
             <button class='signup__submit-btn'>Signup</button>
           </div>
           <div class='signup__login'>
           <a class='signup__login-link' href="#/account/login">Already have an account ? Login here.</a>
         </div>
        </div>
      </div>
    </div>
  `,
}

export default Signup
