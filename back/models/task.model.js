import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo",
    required: true,
  },
  startDate: {
    type : Date,
    required : true
  },
  endDate: {
    type : Date,
    required : true
  },
  status: {
    type: String,
    enum: ["not_started", "in_progress", "completed", "expired"],
    default: "not_started",
  },
});

const Task = mongoose.model("TaskInfo", TaskSchema);
export default Task;
