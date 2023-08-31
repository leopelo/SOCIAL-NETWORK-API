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
      .then( (thought) => 
        res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  async createThought(req, res) {
    try {const newThought = await Thought.create(req.body)
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
  
/*createThought(req,res) {
  Thought.create(req.body)
  .then((thought) => res.json(thought))
  .catch((err) => res.status(600).json(er));*/
//},
  // Delete a thought
  async deleteThought(req, res) {
    try {const eraseThought = await Thought.delete(req.body)
    if(eraseThought) {
      await User.findOneAndRemove (
        {_id: req.body.userId},
        {$addToSet: {thoughts: eraseThought._id}},
        {new:true}
        );
    }
   res.json('thought removed')  }
  catch(err) {
    res.status(500).json(err)
  }
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId}, 
      {$set: req.body}, 
      {runValidators: true, new: true}
      )
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //create reaction
  createReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //addtoset will not replace but add something instead
      { $addToSet: { reactions: req.params.thoughtId } },
      { runValidators: true, new: true }
    )   
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: {reactionId: req.param.reactionId}}},
      {new: true }
    )
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
};
