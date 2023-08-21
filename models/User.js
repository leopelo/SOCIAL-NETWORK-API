const { Schema, model } = require('mongoose');
//const assignmentSchema = require('./Reactions');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+(\.\w{2,3})+/, 'Invalid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ]
  },
  {
    //virtual is not a property of the model but it will still be created as a field
    toJSON: {
      virtual: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})



const User = model('user', userSchema);

module.exports = User;
