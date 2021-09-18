import './_style.scss'

const ShopOption = {
	render: ({ imgUrl, display, link }) => `
    <a href="#/${link}" class='shopOption'>
      <div class='shopOption__img' style='background-image:url(${imgUrl})'>
      </div>
      <p class='shopOption-label'>${display}</p>
    </a>
  `,
}

const ShopDisplay = {
	render: ({ shopMenu }) => {
		const { coverImg, coverTitle, coverSubtitle, subCategory } = shopMenu

		return `
      <div class='shopDisplay'>
        <div class='shopDisplay__cover' style='background-image: linear-gradient(
          315deg, #20bf556b 0%, #01bbefb4 90%) ,url(${coverImg})'>
           <h1 class='shopDisplay__cover-title'>${coverTitle}<h1>
           <h2 class='shopDisplay__cover-subtitle'>${coverSubtitle}<h2>
        </div>
        <div class='shopDisplay__options'>
           ${subCategory
							.map((data) => ShopOption.render({ ...data }))
							.join('\n')}
        </div>
      </div>
    `
	},
}

export default ShopDisplay
