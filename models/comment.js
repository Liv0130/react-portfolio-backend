const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  comment: {
    type: String,
    maxLength: 80,
  },
  score: {
    type: Number,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
