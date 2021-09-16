const db = require('../../data/db-config')

const getAll = () => {
  return db('posts')
}

const getById = async (id) => {
  return db('posts').where({ id }).first()
}

const create = async (account) => {
  const [id] = await db('posts').insert(account)

  return getById(id)
}

const updateById = async (id, account) => {
  
  await db('posts').where({ id }).update(account)

  return getById(id)
  
}

const deleteById = async (id) => {

  const toBeDeleted = await getById(id)
  
  await db('posts').where('id', id).delete()
  
  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
