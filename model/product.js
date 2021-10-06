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
const keyValueSchema = {
  key: { type: String, required: [true, 'provide label for the feature'] },
  value: {
    type: String,
    required: [true, 'Provide description of this feature'],
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
  type:{
    type: String,
    required: [
      true,
      'Provide product type, it could be fashion|electronics',
    ],
  },
  category: {
    type: String,
    required: [
      true,
      'Provide product category, it could be mobile|laptop|men|women',
    ],
  },
  color: {
    type: [String],
    required: [true, 'Provide available color'],
    default: undefined,
  },
  subCategory: {
    type: String,
    required: [
      true,
      'Provide product category, it could be topwaer|bottomwear|budget|premium',
    ],
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
  isDealOfTheDay: { type: Boolean, default: false },
}

export { productSchema, keyValueSchema }
