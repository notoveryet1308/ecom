import './_style.scss'
import menFashion from '../../images/men-fashion.jpg'
import womenFashion from '../../images/women-fashion.jpg'
import laptop from '../../images/laptop.jpg'
import mobile from '../../images/mobile.jpg'

const navigationData = {
	fashion: [
		{
			src: menFashion,
			navLabel: 'Men',
			navData: [
				{ to: 'clothing/topwear/men', display: 'Topwear' },
				{ to: 'clothing/bottomwear/men', display: 'Bottomwear' },
				{ to: 'clothing/footwear/men', display: 'Footwear' },
			],
		},
		{
			src: womenFashion,
			navLabel: 'Women',
			navData: [
				{ to: 'clothing/topwear/women', display: 'Topwear' },
				{ to: 'clothing/bottomwear/women', display: 'Bottomwear' },
				{ to: 'clothing/footwear/women', display: 'Footwear' },
			],
		},
	],
	electronics: [
		{
			src: laptop,
			navLabel: 'Laptop',
			navData: [
				{ to: 'electronics/laptop', display: 'All Laptop' },
				{ to: 'electronics/laptop/premiun', display: 'Premium' },
				{ to: 'electronics/laptop/budget', display: 'Budget' },
			],
		},
		{
			src: mobile,
			navLabel: 'Mobile',
			navData: [
				{ to: 'electronics/mobile', display: 'All Mobile' },
				{ to: 'electronics/mobile/premiun', display: 'Premium' },
				{ to: 'electronics/mobile/budget', display: 'Budget' },
			],
		},
	],
}

const NavItem = {
	render: ({ to, display }) => `
    <a href='/#/${to}' class='navItem'>
      <span class='navItem-name'>${display}</span>
    </a>
  `,
}

const NavDropdownContent = {
	render: ({ src, navData, navLabel }) => `
    <div class='navDropdownContent-container'>
      <img src='${src}' class='navDropdownContent-img'/>
      <div class='navDropdownContent__Navmenu'>
         <p class='navDropdownContent-label'>${navLabel}</p>
         <div class='navDropdownContent-menuList'>
            ${navData.map((el) => NavItem.render({ ...el })).join('\n')}
         </div>
      </div>
    </div>
  `,
}

const renderDropdownMenu = ({ menuData }) =>
	menuData.map((el) => NavDropdownContent.render({ ...el })).join('\n')

const MainNavigation = {
	afterRender: () => {
		const excludedMouseover = [
			'navItem-placeholder',
			'mainNavigation-dropdown',
			'mainNavigation-dropdown__content',
			'navDropdownContent-container',
			'navDropdownContent-img',
			'navDropdownContent__Navmenu',
			'navDropdownContent-menuList',
			'navItem',
			'navItem-name',
			'navDropdownContent-label',
		]
		const navItemPlacehlder = [
			...document.querySelectorAll('.navItem-placeholder'),
		]
		const navigationDropdown = document.querySelector(
			'.mainNavigation-dropdown',
		)
		const navigationDropdownContent = document.querySelector(
			'.mainNavigation-dropdown__content',
		)
		navItemPlacehlder.forEach((node) => {
			node.addEventListener('mouseover', (e) => {
				e.target.style.color = '#08bd81'
				const iconEL = [...e.target.children]
				iconEL[0].classList.remove('ph-caret-down')
				iconEL[0].classList.add('ph-caret-up')
				// iconEL[0].style.color = '#08bd81'
				const data = e.target.getAttribute('data-nav-type')
				navigationDropdown.style.display = 'flex'
				navigationDropdownContent.innerHTML = null
				navigationDropdownContent.insertAdjacentHTML(
					'beforeend',
					renderDropdownMenu({ menuData: navigationData[data] }),
				)
			})
		})

		window.addEventListener('mouseover', (e) => {
			if (!excludedMouseover.includes(e.target.className)) {
				navItemPlacehlder.forEach((node) => {
					const iconEL = [...node.children]
					node.style.color = '#383838'
					iconEL[0].classList.add('ph-caret-down')
					iconEL[0].classList.remove('ph-caret-up')
				})
				navigationDropdown.style.display = 'none'
			}
		})
	},
	render: () => `
    <nav class='mainNavigation-container'>
      <div class='mainNavigation-navWrapper'>
        <p class='navItem-placeholder' data-nav-type='fashion'>
          Fashion
          <i class="ph-caret-down icon"></i>
        </p>
        <p class='navItem-placeholder' data-nav-type='electronics'>
          Electronics
          <i class="ph-caret-down icon"></i>
        </p>
      </div>
      <div class='mainNavigation-dropdown'>
        <div class='mainNavigation-dropdown__content'>
           
        </div>
      </div>
    </nav>
  `,
}

export default MainNavigation
