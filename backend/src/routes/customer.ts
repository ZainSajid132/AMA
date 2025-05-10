import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const customer = new Hono()

// GET /customer - Read all customers
customer.get('/customer', async (c) => {
  const allCustomers = await PrismaClient.customer.findMany()
  return c.json(allCustomers)
})

// POST /customer - Create a new customer
customer.post('/customer', async (c) => {
  const data = await c.req.json()
  data.id = uuidv4()

  const newCustomer = await PrismaClient.customer.create({ data })
  return c.json({ message: 'Customer added', customer: newCustomer })
})

// PUT /customer/:id - Update a customer
customer.put('/customer/:id', async (c) => {
  const id = c.req.param('id')
  const updatedData = await c.req.json()

  try {
    const updatedCustomer = await PrismaClient.customer.update({
      where: { id },
      data: updatedData
    })

    return c.json({ message: 'Customer updated', customer: updatedCustomer })
  } catch (error) {
    return c.json({ error: 'Customer not found or update failed', details: error }, 400)
  }
})

// DELETE /customer/:id - Delete a customer
customer.delete('/customer/:id', async (c) => {
  const id = c.req.param('id')

  try {
    await PrismaClient.customer.delete({
      where: { id }
    })

    return c.json({ message: 'Customer deleted', id })
  } catch (error) {
    return c.json({ error: 'Customer not found or delete failed', details: error }, 400)
  }
})

export default customer
