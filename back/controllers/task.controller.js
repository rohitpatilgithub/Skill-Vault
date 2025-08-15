import Task from "../models/task.model.js";
import { expiredStatus } from "../utils/task.utils.js";

export const createTask = async (req, res) => {
  try {
    const { title, startDate, endDate, status } = req.body;
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ msg: "Invalid Creds" });
    }
    const newTask = await new Task({
      title,
      createdBy: req.user.id,
      startDate,
      endDate,
      status,
    });
    await newTask.save();
    return res.status(201).json({ message: "Task created ", data: newTask });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    await expiredStatus();
    const data = await Task.find({ createdBy: req.user.id });
    if (!data) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "No user id found " });
    }
    const data = await Task.findByIdAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({ msg: "Task does not exist" });
    }
    return res
      .status(200)
      .json({ msg: "Deleted task successfully", data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Server error " + error.message });
  }
};

export const putTask = async (req,res) => {
  try {
    const { id } = req.params;
    const { title , startDate, endDate, status } = req.body;
    if(!title || !startDate || !endDate || !status){
      return res.status(400).json({msg : 'Incomplete details'});
    }
    const updatedTask = await Task.findByIdAndUpdate( id ,{ title , startDate, endDate, status }, {new : true , overwrite : true , runValidators : true});
    if(!updatedTask){
      return res.status(404).json({msg : 'Failed to update the task'});
    }
    res.status(201).json({msg : 'Updated task',data : updatedTask});
  } catch (error) {
    return res.status(500).json({ msg : 'Server'+error.message})
  }
}

// export const patchTaskStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, startDate, endDate } = req.body;
//     const patchStatus = await Task.findOneAndUpdate(
//       { _id: id },
//       { title, startDate, endDate },
//       { new: true, runValidators: true }
//     );
//     if (!patchStatus) {
//       return res
//         .status(400)
//         .json({ msg: "Failed to update due to lack of credentials" });
//     }

//     return res
//       .status(201)
//       .json({ msg: "Patched the status", data: patchStatus });
//   } catch (error) {
//     return res.status(500).json({ msg: "Server Error" });
//   }
// };

export const getFilteredTasks = async (req, res) => {
  try {
    await expiredStatus();
    const { order = "asc" } = req.query;

    // Order: completed -> in_progress -> not_started -> expired
    const statusOrderAsc = [
      "completed",
      "in_progress",
      "not_started",
      "expired",
    ];
    const statusOrder =
      order === "desc" ? [...statusOrderAsc].reverse() : statusOrderAsc;

    const tasks = await Task.find({ createdBy: req.user.id });

    const plainTasks = tasks.map((task) => task.toObject());

    const sortedTasks = plainTasks.sort((a, b) => {
      const indexA = statusOrder.indexOf(a.status);
      const indexB = statusOrder.indexOf(b.status);

      // Handle cases where status is not found in the array
      if (indexA === -1) return 1; // Put unknown statuses at the end
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

    res.status(200).json({ data: sortedTasks });
  } catch (error) {
    console.error("Error in getFilteredTasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
