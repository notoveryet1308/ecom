import axios from 'axios'

const fetchData = async ({ resource, params }) => {
	const response = await axios.get(`http://localhost:4000/api/v1/${resource}`, {
		params: { ...params },
	})
	return response.data.data.products
}

class ProductListing {
	constructor(resource, params) {
		this.resource = resource
		this.params = params
	}

	async render() {
		const {
			status,
			data: { products },
		} = await this.getProducts()
		const pName = (name) => `<h3> ${name} </h3>`
		if (status === 'error' || status === 'fail') {
			return '<div>Error in fetching data. Please try again !!</div>'
		}
		return `
		<div class="product-container">
			<h1>Product Listing</h1>
			${products.map((el) => pName(el.name))}
		</div>
	`
	}

	async getProducts() {
		const response = await axios.get(
			`http://localhost:4000/api/v1/${this.resource}`,
			{
				params: { ...this.params },
			},
		)
		return response.data
	}
}

export default ProductListing
