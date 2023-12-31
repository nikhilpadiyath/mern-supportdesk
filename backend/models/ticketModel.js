const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    product:{
        type: String,
        required: [true, 'Please select a brand'],
        enum: ['Redmi','Samsung','Apple','Vivo'],
    },
    description:{
        type: String,
        required: [true, 'Please describe your issue'],
    },
    status:{
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new',
    }

},
{
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema)