const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const {create} = require('../models/User')

module.exports = {
  // Get all students
  getAllUsers(req, res) {
    User.find()
      .then( (users) => {
       res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then( (user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    console.log("adding user");
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

//update a user

  updateUser (req,res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))
  },

  // Add a friend for user
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      //addtoset will not replace but add something instead
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )   
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
};
