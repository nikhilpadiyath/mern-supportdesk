const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desc   Get tickets
//@route  GET /api/tickets
//@access  private

const getTickets = asyncHandler(async (req,res)=> {
    //Get user by id in JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
})


//@desc   Get user ticket
//@route  GET /api/tickets/:id
//@access  private

const getTicket = asyncHandler(async (req,res)=> {
    //Get user by id in JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)
})

//@desc   Delete a ticket
//@route  DELETE /api/tickets/:id
//@access  private

const deleteTicket = asyncHandler(async (req,res)=> {
    //Get user by id in JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    await ticket.deleteOne()

    res.status(200).json({success: true})
})

//@desc   Update a ticket
//@route  PUT /api/tickets/:id
//@access  private

const updateTicket = asyncHandler(async (req,res)=> {
    //Get user by id in JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedTicket)
})


//@desc   Create new ticket
//@route  POST /api/tickets
//@access  private

const createTicket = asyncHandler(async (req,res)=> {
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Please fill the fields')
    }

    //Get user by id in JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})

module.exports = {
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket,
    createTicket,
}