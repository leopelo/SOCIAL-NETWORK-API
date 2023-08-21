const { Thought, User } = require('../models');


module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then( (thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  async createThought(req, res) {
    try {const newThought = Thought.create(req.body)
    if(newThought) {
      await User.findOneAndUpdate (
        {_id: req.body.userId},
        {$addToSet: {thoughts: newThought._id}},
        {new:true}
        );
    }
   res.json('thought created')  }
  catch(err) {
    res.status(500).json(err)
  }
},
  
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body.thoughtText}, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  //create reaction
  createReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //addtoset will not replace but add something instead
      { $addToSet: { reactions: req.params.thoughtId } },
      { runValidators: true, new: true }
    )   
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
  // delete reaction
  deleteReaction(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
