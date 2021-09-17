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

router.get('/:id', checkAccountId, async (req, res) => {

  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const accountToAdd = await Accounts.create(req.body)

    res.status(201).json(accountToAdd)

  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedID = await Accounts.updateById(req.params.id, req.body)
    res.json(updatedID)
    
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {

  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)

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
