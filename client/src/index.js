import './index.scss'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import { handleRootRouting, getRouteDetail } from './util/routing'

const routesAndPages = {
	home: Home,
	clothing: ProductListing,
}

const root = document.getElementById('root')
const initialRoute = handleRootRouting()

const initApp = async (route) => {
	const { resource, params } = route
	const PageToBeRnder = resource ? routesAndPages[resource] : ''
	const page = new PageToBeRnder(resource, params)
	root.innerHTML = null
	root.insertAdjacentHTML('beforeend', await page.render())
}

initApp(initialRoute)

// global listener
window.addEventListener('hashchange', () => {
	const routeInfo = getRouteDetail()
	initApp(routeInfo)
})
