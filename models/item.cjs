const {model} = require("mongoose")
//ensure that the caterogy model is processed by mongoose.
require("./category.cjs")
const itemSchema = require("./itemSchema.cjs")

module.exports = model("Item", itemSchema)