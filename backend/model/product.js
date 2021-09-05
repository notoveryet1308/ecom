const productHighlightSchema = {
  label: {
    type: String,
    required: [true, 'Product highlight label is required'],
  },
  description: {
    type: String,
    required: [true, 'Product highlight description is required'],
    trim: true,
  },
}

const productSpecificationSchema = {
  detail: {
    type: String,
    required: [true, 'Product specification detail is required'],
    trim: true,
  },
  photo: String,
}

const productSellerInfo = {
  name: {
    type: String,
    required: [true, 'Provide seller name '],
  },
  address: {
    type: String,
    required: [true, 'Provide seller`s address'],
  },
  city: {
    type: String,
    required: [true, 'Provide seller`s city name'],
  },
  zipCode: {
    type: Number,
    required: [true, 'Provide seller`s loction zip code'],
  },
}

const productSchema = {
  name: {
    type: String,
    required: [true, 'Product name is needed'],
  },
  brand: {
    type: String,
    required: [true, 'Prdouct brand is required'],
  },
  imageUrl: {
    type: String,
    // required: [true, 'Product image is needed'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is needed'],
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function validator(value) {
        return value < this.price
      },
      message: 'Discount price should always be less than original price',
    },
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
    default: undefined,
  },
  sellerInformation: {
    type: productSellerInfo,
    required: [true, 'Provide product sellers infomation'],
  },
}

// const Product = mongoose.model('product', productSchema)
export {
  // Product,
  productSchema,
  productHighlightSchema,
  productSpecificationSchema,
  productSellerInfo,
}
