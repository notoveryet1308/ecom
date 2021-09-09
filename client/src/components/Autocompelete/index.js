import axios from 'axios'
import './_style.scss'

const SuggestionCard = {
	render: ({ keyname, searchProduct, searchTerm, userSearch }) => {
		let quries = ''
		const searchQuery = { ...searchTerm }
		const queryParams = Object.keys(searchQuery)
		queryParams.forEach((el, index) => {
			const queryValue = searchQuery[el]
			quries = quries.concat(
				`${el}=${queryValue}${index !== queryParams.length - 1 ? '&' : ''}`,
			)
		})
		return `
		<div class='suggestion-card'>
		  <a href="/#/search?${searchProduct}&${quries}" class='suggestionCard-link'>
		    <i class="ph-magnifying-glass-bold icon"></i>
			  <span class='suggestion-label ${
					userSearch ? 'userSearch-label' : ''
				}'>${keyname}</span>
		  </a>
	  </div>
    `
	},
}

const AutoSuggestionList = [
	{
		keyname: 'Mobile',
		searchProduct: 'electronics',
		searchTerm: {
			category: 'mobile',
		},
	},
	{
		keyname: 'Laptop',
		searchProduct: 'electronics',
		searchTerm: {
			category: 'laptop',
		},
	},
	{
		keyname: 'Tshirt - Men ',
		searchProduct: 'fashion',
		searchTerm: {
			idealFor: 'men',
			tags: ['tshirt'],
		},
	},
	{
		keyname: 'Jeans - Women ',
		searchProduct: 'fashion',
		searchTerm: {
			idealFor: 'women',
			tags: ['jeans'],
		},
	},
	{
		keyname: 'Jeans - men ',
		searchProduct: 'fashion',
		searchTerm: {
			idealFor: 'men',
			tags: ['jeans'],
		},
	},
	{
		keyname: 'Shirt - Men ',
		searchProduct: 'fashion',
		searchTerm: {
			idealFor: 'men',
			tags: ['shirt'],
		},
	},
]

const updateUI = (updateContainer, updatedList, updateCompnent) => {
	updateContainer.innerHTML = null
	updateContainer.insertAdjacentHTML(
		'beforeend',
		updatedList.map((el) => updateCompnent.render({ ...el })).join('\n'),
	)
}

const debounce = function (functionToBeDebounce, delay) {
	let timer
	let data
	return function (...args) {
		const context = this
		clearTimeout(timer)
		timer = setTimeout(() => {
			data = functionToBeDebounce.apply(context, args)
		}, delay)
		return data
	}
}

const fetchSuggetionData = async (value) => {
	const response = await axios.get(
		'http://localhost:4000/api/v1/autoSuggestion',
		{
			params: { keyname: value },
		},
	)
	return response.data
}
const debounced = debounce(fetchSuggetionData, 300)

const AutocompleteSearch = {
	afterRender: () => {
		const searchInput = document.getElementById('searchInput')
		const suggestionDisplay = document.querySelector('.autocomplete__display')
		const suggestionWrapper = document.querySelector(
			'.autocomplete__suggestion',
		)
		searchInput.addEventListener('focus', () => {
			suggestionDisplay.style.display = 'block'
		})

		searchInput.addEventListener('input', async (e) => {
			const suggestionList = await debounced(e.target.value)
			console.log({ suggestionList })
			if (suggestionList?.data) {
				updateUI(
					suggestionWrapper,
					suggestionList.data.suggestionList,
					SuggestionCard,
				)
			} else {
				updateUI(suggestionWrapper, AutoSuggestionList, SuggestionCard)
			}
		})
		window.addEventListener('click', (e) => {
			if (e.target.id !== 'searchInput') {
				suggestionDisplay.style.display = 'none'
			}
		})
	},

	render: () => `
     <div class='autocomplete-container'>
      <div class='autocomplete__input'>
        <div class='autocmplete__searchInput'>
          <input id='searchInput' placeholder='Search product or brand...' />
          <i class="ph-magnifying-glass-bold searchIcon icon"></i>
        </div> 
      </div>
      <div class='autocomplete__display'>
        <div class='autocomplete__suggestion'>
         ${AutoSuggestionList.map((el) =>
						SuggestionCard.render({ ...el }),
					).join('\n')}
        </div>
      </div>
     </div>
    `,
}

export default AutocompleteSearch
