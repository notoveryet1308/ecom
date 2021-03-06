import { getClothingProduct, getEveryDayDeal, getProductDetail } from './API'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductListing from './pages/ProductListing'
import Checkout from './pages/Checkout'
import { handleRootRouting, getRouteDetail } from './util/routing'
import UserProfile from './pages/UserProfile'
import Shop from './pages/Shop'

import './index.scss'

const routesAndPages = {
	home: { Component: Home, apiCall: null },
	clothing: { Component: ProductListing, apiCall: getClothingProduct },
	offer: { Component: ProductListing, apiCall: getEveryDayDeal },
	account: { Component: Auth, apiCall: null },
	product: { Component: Product, apiCall: getProductDetail },
	viewCart: { Component: Cart, apiCall: null },
	checkout: { Component: Checkout, apiCall: null },
	profile: { Component: UserProfile, apiCall: null },
	shop: { Component: Shop, apiCall: null },
}

const root = document.getElementById('root')
const initialRoute = handleRootRouting()

const initApp = async (route) => {
	const { resource, params } = route
	const PageComponentDetail = resource ? routesAndPages[resource] : ''
	const { Component, apiCall } = PageComponentDetail
	const page = new Component(resource, params, apiCall)
	root.innerHTML = null
	root.insertAdjacentHTML('beforeend', await page.render())
	// after render
	await page.afterRender()
}

initApp(initialRoute)

// global listener
window.addEventListener('hashchange', () => {
	const routeInfo = getRouteDetail()
	initApp(routeInfo)
})

const protectedRoutes = ()=>{
	const isLoggedIn = LocalStorage.getItem('user-auth-token')
}