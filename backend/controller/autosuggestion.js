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
  if (!req.query.keyname) {
    return next(new AppError('empty query', 404))
  }
  const suggestionList = await AutoSuggestion.find({
    keyname: { $regex: `${req.query.keyname}`, $options: 'i' },
  })

  res.status(200).json({
    status: 'success',
    data: { suggestionList },
  })
})

export { createAutoSuggestion, getAutoSuggetionList }
