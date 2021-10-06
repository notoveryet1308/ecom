import mongoose from 'mongoose'

const autoSuggestionSchema = new mongoose.Schema({
  display: {
    type: String,
    required: [true, 'Provide auto suggestion display'],
  },
  searchTerm: { type: String, required: [true, 'Search term is required'] },
  productType: { type: String, required: [true, 'Provide product type'] },
  searchRelatedQuery: {
    type: Object,
    required: [true, 'Search product is required'],
  },
})

const AutoSuggestion = mongoose.model('auto-suggestion', autoSuggestionSchema)
export default AutoSuggestion
