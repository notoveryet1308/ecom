import { LinkIconBtn } from '.'

const DropdownDisplayLink = new LinkIconBtn('dropdownDisplayLinkBtn')

const DropdownOption = ({ id, display, identifier }) => `
  <p id="${id}" class='dropdown-option dropdown-option--${identifier}'>${display}</p>
`

class DropdownBtn {
	constructor(identifier, options) {
		this.identifier = identifier
		this.options = options
	}

	render({ display, to, icon }) {
		return `
      <div class='dropdown dropdown--${this.identifier}'>
         <div class='dropdown__display dropdown__display--${this.identifier}'>
           ${DropdownDisplayLink.render({ to, display, icon })}
         </div>
         <div class='dropdown__options dropdown__options--${this.identifier}'>
           ${this.options
							.map((option) =>
								DropdownOption({ ...option, identifier: this.identifier }),
							)
							.join('\n')}
         </div>
      </div>
    `
	}

	afterRender() {
		const dropDownoptions = [
			...document.querySelectorAll(`.dropdown-option--${this.identifier}`),
		]
		const dropdownDisplay = document.querySelector(
			`.dropdown__display--${this.identifier}`,
		)
		const dropdownOptions = document.querySelector(
			`.dropdown__options--${this.identifier}`,
		)
		dropdownDisplay.addEventListener('click', (e) => {
			if (
				e.target.className.includes(`dropdown__display--${this.identifier}`)
			) {
				dropdownOptions.style.display = 'flex'
			}
		})
		dropDownoptions.map((optionEl) => {
			optionEl.addEventListener('click', (e) => {
				console.log({ e: e.target })
				this.options.forEach((el) => {
					console.log({ el })
					if (el.id === e.target.id) {
						console.log({ el })
						e.target.click = el.onClick()
					}
				})
			})
		})

		window.addEventListener('click', (e) => {
			if (
				e.target.className !==
				`dropdown__display dropdown__display--${this.identifier}`
			) {
				dropdownOptions.style.display = 'none'
			}
		})
	}
}

export default DropdownBtn
