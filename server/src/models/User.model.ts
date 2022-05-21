import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    imageURL: {
      type: String
    },
    role: {
      type: String,
      enum: ['USER', 'MOD', 'ADMIN'],
      default: 'USER'
    },
    name: {
      type: String,
      maxlength: 20,
      required: true
    },
    surname: {
      type: String,
      maxlength: 20,
      required: true
    },
    birthday: {
      type: Date
    },
    usersFollowed: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default model('User', userSchema)
