import Task from "../models/task.model.js"

// export const expiredStatus = async () => {
//     try {
//         const tasks = await Task.find({});
//         if(!tasks){
//             return res.status(404).json({msg : 'No data found'});
//         }
//         tasks.forEach((task) => {
//             if(task.endDate < new Date()){
//                 task.status('expired');
//             }
//         return task;
//         })
//         return res.status(200).json({msg : 'Cleaned the DB' , tasks});
//     } catch (error) {
//         return res.status(500).json({msg : 'Server error'});
//     }
// }

export const expiredStatus = async () => {
    try {
        // Find tasks that are past their end date and not already expired
        const expiredTasks = await Task.find({
            endDate: { $lt: new Date() },
            status: { $ne: 'expired' }
        });

        if (expiredTasks.length === 0) {
            return { message: 'No tasks to expire', count: 0 };
        }

        // Update all expired tasks in one database operation
        const updateResult = await Task.updateMany(
            {
                endDate: { $lt: new Date() },
                status: { $ne: 'expired' }
            },
            {
                $set: { status: 'expired' }
            }
        );

        return { 
            message: 'Tasks updated successfully', 
            count: updateResult.modifiedCount 
        };

    } catch (error) {
        console.error('Error in expiredStatus:', error);
        throw error; // Let the calling function handle the error
    }
}