import { LinkButtonTertiary } from '../generalUI/Button'
import './_style.scss'

const UserInformation = {
	render({ fullname, email }) {
		return `
      <div class='userInformation'>
        <div class='user-photo'>
           <img src="https://robohash.org/commodiaspernaturcorrupti.png?size=150x150&set=set1" />
        </div>
        <div class='user-detail-and-action'>
           <div class='user-detail'>
              <div class='param user-name'>
                 <p class='param-label'>Fullname<p>
                 <p class='param-display'>${fullname}<p>
              </div>
              <div class='param user-email'>
                <p class='param-label'>Email<p>
                <p class='param-display'>${email}<p>
              </div>
           </div>
           <div class='user-action'>
              ${LinkButtonTertiary.render({
								to: '',
								display: 'Change Password',
							})}
           </div>
        </div>
      </div>
    `
	},
}

export default UserInformation
