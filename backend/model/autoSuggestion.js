import mongoose from 'mongoose'

const autoSuggestionSchema = new mongoose.Schema({
  keyname: { type: String, required: [true, 'Search keyname is required'] },
  searchProduct: {
    type: String,
    required: [true, 'Search product is required'],
  },
  searchTerm: { type: Object, required: [true, 'Provide search term'] },
})

const AutoSuggestion = mongoose.model('auto-suggestion', autoSuggestionSchema)
export default AutoSuggestion
