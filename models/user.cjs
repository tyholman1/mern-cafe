const { Schema, model } = require("mongoose")
const SALT_ROUNDS = 6
const bcrypt = require("bcrypt")


const userSchema = new Schema({
    name: { type: String, required: true},
    email:{
        type:String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    }
}, {
        timestamps: true,
          // Even though it's hashed - don't serialize the password

        toJSON: {
            transform: function(doc, ret) {
              delete ret.password;
              return ret;
            }
        }
})

userSchema.pre('save', async function(next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    //bcrypt library
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  });

module.exports = model("User", userSchema)