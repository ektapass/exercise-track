const mongoose = require('mongoose')

const extrSchema = new mongoose.Schema(
   {
   description: String,
   complete: Boolean
}
)

const Extrs = mongoose.model('Extr', extrSchema)

module.exports = Extrs