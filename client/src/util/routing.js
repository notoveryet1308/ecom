const routeList = ['#', '#/clothing/:subCategory/:category', '#/account/:authType', '#/offer/:deal']

const matchCurrentRouteAndGetParams = (resources, routes) => {
	const currentRoute = routes.find((route) => {
		const routeDetail = route.split('/')
		// console.log({ routeDetail, route, resources })
		if (resources[1] === routeDetail[1]) {
			return routeDetail
		}
	})
	// console.log({ currentRoute })
	return currentRoute ? currentRoute.split('/') : null
}

const getRouteDetail = () => {
	const resources = window.location.hash.split('/')
	const currentRoute = matchCurrentRouteAndGetParams(resources, routeList)
	const params = {}
	if (currentRoute) {
		currentRoute.forEach((element, index) => {
			if (element.startsWith(':')) {
				const newEl = element.replace(/\/|:/g, '')
				params[newEl] = resources[index]
			}
		})
	}
	console.log({ params, resource: resources[1] })
	return { params, resource: resources[1] }
}

const handleRootRouting = () => {
	let routeDetail = {}
	const { hash } = window.location
	if (!hash) {
		// console.log('URL CHANGED')
		window.location.replace('/#/home')
		routeDetail = { params: null, resource: 'home' }
	} else if (hash) {
		routeDetail = getRouteDetail()
	}

	return routeDetail
}

export { handleRootRouting, getRouteDetail }
