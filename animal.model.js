const mongoose = require('mongoose') 


const Animals = mongoose.model('Animal', {
	name: { type: String, required: true, minLength: 3 },
	type: { type: String, required: true, minLength: 3 },
})

module.exports = Animals
