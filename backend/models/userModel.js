const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Plead add a name'],
    },
    email: {
      type: String,
      required: [true, 'Plead add an email'],
    },
    password: {
      type: String,
      required: [true, 'Plead add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
