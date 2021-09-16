const router = require('express').Router()
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
 
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)

  } catch (err) {
    next(err)
  } 
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {

    const account = await Accounts.getById(req.params.id)
    res.json(account)

  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('add account')

  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('update account by id')

  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('delete account')

  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
 res.status(err.status || 500).json({
   message: err.message,
 })
})

module.exports = router;
