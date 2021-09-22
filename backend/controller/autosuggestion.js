import AutoSuggestion from '../model/autoSuggestion'
import catchAsync from '../utils/CatchAsync'
import AppError from '../utils/AppError'

const createAutoSuggestion = catchAsync(async (req, res, next) => {
  const autoSuggestion = await AutoSuggestion.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      autoSuggestion,
    },
  })
})

const getAutoSuggetionList = catchAsync(async (req, res, next) => {
  if (!req.query.searchTerm) {
    return next(new AppError('empty query', 404))
  }
  // const suggestionList = await AutoSuggestion.find({
  //   searchTerm: { text: `${req.query.searchTerm}`, $options: 'i' },
  // })
  const suggestionList = await AutoSuggestion.aggregate([{
    $search:{
      text:{
        query:  req.query.searchTerm,
        path: ['searchTerm'],
        fuzzy:{
          'maxEdits': 2.0,
          prefixLength: 3
        }
      },
    }
  }])

  res.status(200).json({
    status: 'success',
    data: { suggestionList },
  })
})

export { createAutoSuggestion, getAutoSuggetionList }

// "keyname":"red color jeans - men",
//     "searchProduct": "fashion",
//     "searchTerm":{
//         "idealFor":"men",
//         "tags":["jeans"],
//         "color": "red"
//     },