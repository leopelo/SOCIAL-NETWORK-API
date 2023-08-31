const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate.js');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => formatDate(date)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]

  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
