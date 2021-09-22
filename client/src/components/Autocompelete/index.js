import { autoSuggestionData } from '../../API'
import { debounce } from '../../util/functions'
import './_style.scss'

const SuggestionCard = {
	render: ({ display, searchRelatedQuery, productType, userSearch }) => {
		const searchQuery = { ...searchRelatedQuery }
		return `
		<div class='suggestion-card'>
		  <a href="/#/${productType}/${searchQuery?.subCategory}/${
			searchQuery?.category
		}/${searchQuery?.tags}" class='suggestionCard-link'>
		    <i class="ph-magnifying-glass-bold icon"></i>
			  <span class='suggestion-label ${
					userSearch ? 'userSearch-label' : ''
				}'>${display}</span>
		  </a>
	  </div>
    `
	},
}

const NoResult = '<p class="no-result"> No results </p>'

const updateUI = (updateContainer, updatedList, updateCompnent, option) => {
	updateContainer.innerHTML = null
	updateContainer.insertAdjacentHTML(
		'beforeend',
		updatedList
			.map((el) =>
				updateCompnent.render({ ...el, userSearch: option.userSearch }),
			)
			.join('\n'),
	)
}

const updateSuggestionList = async (
	value,
	suggestionWrapper,
	suggestionDisplay,
) => {
	const suggestionList = await autoSuggestionData(value)
	suggestionDisplay.style.display = 'block'
	if (suggestionList?.length) {
		updateUI(suggestionWrapper, suggestionList, SuggestionCard, {
			userSearch: true,
		})
	} else {
		suggestionWrapper.innerHTML = NoResult
	}
}

class AutocompleteSearch2 {
	constructor(identifier) {
		this.identifier = identifier
	}

	render() {
		return `
		<div class='autocomplete-container autocomplete-container--${this.identifier}'>
		<div class='autocomplete__input'>
			<div class='autocmplete__searchInput'>
				<input id='searchInput'  class='searchInput--${this.identifier}' placeholder='Search product or brand...' />
				<i class="ph-magnifying-glass-bold searchIcon icon"></i>
			</div> 
		</div>
		<div class='autocomplete__display autocomplete__display--${this.identifier}'>
			<div class='autocomplete__suggestion'>

			</div>
		</div>
	 </div>
		`
	}

	afterRender() {
		const searchInput = document.querySelector(
			`.searchInput--${this.identifier}`,
		)
		const suggestionDisplay = document.querySelector(
			`.autocomplete__display--${this.identifier}`,
		)
		const suggestionWrapper = document.querySelector(
			`.autocomplete__display--${this.identifier} .autocomplete__suggestion`,
		)

		const debounced = debounce(updateSuggestionList, 300)
		searchInput.addEventListener('focus', (e) => {
			if (e.target.value) {
				debounced(e.target.value, suggestionWrapper, suggestionDisplay)
			}
		})
		searchInput.addEventListener('input', (e) => {
			debounced(e.target.value, suggestionWrapper, suggestionDisplay)
		})
		window.addEventListener('click', (e) => {
			if (e.target.id !== 'searchInput') {
				suggestionDisplay.style.display = 'none'
			}
		})
	}
}

export default AutocompleteSearch2
