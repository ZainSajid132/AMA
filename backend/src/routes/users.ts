import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const users = new Hono()

// In-memory store (you can replace this with DB logic)
let userList = [
  { id: '1', name: 'Ali Raza', phone: '0300-1234567' },
  { id: '2', name: 'Sana Khan', phone: '0312-9876543' },
]

// GET /users - Read all users
users.get('/users', async  (c) => {
  const allUsers = await PrismaClient.user.findMany()
  return c.json(allUsers)
})

// POST /users - Create a new user
users.post('/users', async (c) => {

  const data = await c.req.json()
   data.id = uuidv4()
  const newUser = await PrismaClient.user.create({ data })
  return c.json(newUser)
})

// PUT /users/:id - Update a user
users.put('/users/:id', async (c) => {
  const id = c.req.param('id')
  const updatedData = await c.req.json()
  
  try {
    const updatedUser = await PrismaClient.user.update({
      where: { id: id },
      data: updatedData
    })

    return c.json({ message: 'User updated', user: updatedUser })
  } catch (error) {
    return c.json({ error: 'User not found or update failed', details: error }, 400)
  }
})

// DELETE /users/:id - Delete a user
users.delete('/users/:id',  async(c) => {
  const id = c.req.param('id')
  try {
    await PrismaClient.user.delete({
      where: { id: id },
    })
    return c.json({ message: 'User deleted', id })
  } catch (error) {
    return c.json({ error: 'User not found or delete failed', details: error }, 400)
  }
})

export default users;
