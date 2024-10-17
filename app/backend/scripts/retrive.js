// scripts/retrieveTasks.js

const hre = require("hardhat");

async function main() {
    const todolistAddress = "0x632C0C71a9fB1C318fBFb84D0C9f7E449a650cbc";

    const TodoList = await hre.ethers.getContractFactory("TodoList");
    const todoList = await TodoList.attach(todolistAddress);

    console.log(`Connected to TodoList contract at address: ${todolistAddress}`);

    // Retrieve all tasks with pagination
    const allTasks = await getAllTasksPaginated(todoList, 10);

    if (allTasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    console.log("Retrieved Tasks:");
    allTasks.forEach((task) => {
        console.log(`\nTask ID: ${task.id}`);
        console.log(`Content: ${task.content}`);
        console.log(`Completed: ${task.completed}`);
    });
}

// Function to retrieve tasks with pagination
async function getAllTasksPaginated(todoList, pageSize = 10) {
    const totalTasks = await todoList.taskCount();
    const totalPages = Math.ceil(totalTasks / pageSize);
    const allTasks = [];

    for (let page = 0; page < totalPages; page++) {
        const start = page * pageSize + 1;
        const end = Math.min((page + 1) * pageSize, totalTasks);
        console.log(`Fetching tasks ${start} to ${end}...`);
        for (let id = start; id <= end; id++) {
            try {
                const task = await todoList.tasks(id);
                allTasks.push(task);
            } catch (error) {
                console.error(`Error fetching task with ID ${id}:`, error);
            }
        }
    }

    return allTasks;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error retrieving tasks:", error);
        process.exit(1);
    });
