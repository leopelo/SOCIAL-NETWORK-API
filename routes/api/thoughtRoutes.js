const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getAllThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
