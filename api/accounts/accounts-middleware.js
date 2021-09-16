exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountID = req.params.id

    if(accountID) {
      res.accountID = accountID
      next()
    } else {
      res.status(404).json({ message: 'Account ID cannot be found'})
    }
  } catch (err) { next(err) }
}
