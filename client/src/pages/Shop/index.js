import Header from '../../components/Header'
import menShopCover from '../../images/men-fashion.jpg'
import womenShopCover from '../../images/shop-women.jpg'
import laptopShopCover from '../../images/laptop.jpg'
import mobileShopCover from '../../images/mobile.jpg'
import menTopWear from '../../images/men-topwear.jpg'
import menBottomWear from '../../images/men-botomwear.jpg'
import menFootwear from '../../images/men-footwear.jpg'
import ShopDisplay from '../../components/ShopDisplay'
import womenTopwear from '../../images/womeTopwear.jpg'
import womenBottomwear from '../../images/womenBottomwear.jpg'
import womenFootwear from '../../images/womeFootwear.jpg'
import gamingLaptop from '../../images/gamingLaptop.jpg'
import premiumLaptop from '../../images/premiumLaptop.jpg'
import budgetLaptop from '../../images/budgetLaptop.jpg'
import latestPhone from '../../images/latestPhone.jpg'
import premiumPhone from '../../images/premiumPhone.jpg'
import budgetPhone from '../../images/budgetPhone.jpeg'
import './_style.scss'

const shopStaticData = {
	clothing: {
		men: {
			coverImg: menShopCover,
			coverTitle: 'Shop For Men',
			coverSubtitle: 'THE BEST YOU WILL GET',
			subCategory: [
				{
					display: 'Topwear',
					link: 'clothing/topwear/men',
					imgUrl: menTopWear,
				},
				{
					display: 'Bottomwear',
					link: 'clothing/bottomwear/men',
					imgUrl: menBottomWear,
				},
				{
					display: 'Footwear',
					link: 'clothing/footwear/men',
					imgUrl: menFootwear,
				},
			],
		},
		women: {
			coverImg: womenShopCover,
			coverTitle: 'Shop For Women',
			coverSubtitle: 'THE BEST YOU WILL GET',
			subCategory: [
				{
					display: 'Topwear',
					link: 'clothing/topwear/women',
					imgUrl: womenTopwear,
				},
				{
					display: 'Bottomwear',
					link: 'clothing/bottomwear/women',
					imgUrl: womenBottomwear,
				},
				{
					display: 'Footwear',
					link: 'clothing/footwear/women',
					imgUrl: womenFootwear,
				},
			],
		},
	},
	electronics: {
		laptop: {
			coverImg: laptopShopCover,
			coverTitle: 'Shop Laptop',
			coverSubtitle: 'THE BEST YOU WILL GET',
			subCategory: [
				{
					display: 'Gaming',
					link: 'electronics/gaming/laptop',
					imgUrl: gamingLaptop,
				},
				{
					display: 'Premium',
					link: 'electronics/premium/laptop',
					imgUrl: premiumLaptop,
				},
				{
					display: 'Budget',
					link: 'electronics/budget/laptop',
					imgUrl: budgetLaptop,
				},
			],
		},
		mobile: {
			coverImg: mobileShopCover,
			coverTitle: 'Shop Mobile',
			coverSubtitle: 'THE BEST YOU WILL GET',
			subCategory: [
				{
					display: 'Latest',
					link: 'electronics/latest/mobile',
					imgUrl: latestPhone,
				},
				{
					display: 'Premium',
					link: 'electronics/premium/mobile',
					imgUrl: premiumPhone,
				},
				{
					display: 'Budget',
					link: 'electronics/budget/mobile',
					imgUrl: budgetPhone,
				},
			],
		},
	},
}

class Shop {
	constructor(resource, params, apiCall) {
		this.resource = resource
		this.params = params
		this.apiCall = apiCall
	}

	render() {
		console.log(this)
		const shopMenu =
			shopStaticData[this.params.category][this.params.subCategory]
		return `
      <div class='shop'>
         ${Header.render()}
         <div class='shop-container'>
           <div class='shop-content'>
              ${ShopDisplay.render({ shopMenu })}
           </div>
         </div>
      </div>
    `
	}

	afterRender() {
		Header.afterRender()
	}
}

export default Shop
