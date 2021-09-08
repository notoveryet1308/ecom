import './_style.scss'

const AutocompleteSearch = {
	render: () => `
     <div class='autocomplete-container'>
      <div class='autocomplete__input'>
        <div class='autocmplete__searchInput'>
          <input id='searchInput' placeholder='Search product or brand...' />
          <i class="ph-magnifying-glass searchIcon icon"></i>
        </div> 
      </div>
      <div class='autocomplete__display'>
      
      </div>
     </div>
    `,
}

export default AutocompleteSearch
