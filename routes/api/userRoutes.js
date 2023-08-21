const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);

// /api/students/:studentId/assignments
//router.route('/:userId/assignments');

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
