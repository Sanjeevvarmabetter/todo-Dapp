// scripts/interactWithTodoList.js

const hre = require("hardhat");

async function main() {
    const todoListAddress = "0x632C0C71a9fB1C318fBFb84D0C9f7E449a650cbc";

    const TodoList = await hre.ethers.getContractFactory("TodoList");

    const todoList = await TodoList.attach(todoListAddress);

    const tx = await todoList.createTask("Drink milk");
    await tx.wait(); 

    console.log("Task created: 'Drink Milk'");

    const taskCount = await todoList.taskCount();
    console.log("Total tasks:", taskCount.toString());

    const task = await todoList.tasks(taskCount); 
    console.log(`Task ID: ${task.id}, Content: ${task.content}, Completed: ${task.completed}`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
