//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TodoList {
	struct Task {
	uint id;
	string content;
	bool completed;
	}
	mapping(uint=>Task) public tasks;

	uint public taskCount;
	uint[] public taskIds;

	event TaskCreated(uint id,string content,bool completed);
	event TaskCompleted(uint id,bool completed);

	constructor() {	
		
		taskCount = 0;
	}
		
	function createTask(string memory _content) public {	
		taskCount++;
		tasks[taskCount] = Task(taskCount,_content,false);
		emit TaskCreated(taskCount,_content,false);
	}

	function completeTask(uint _id) public {
		Task storage task = tasks[_id];
		task.completed = !task.completed;
		emit TaskCompleted(_id,task.completed);
	}

	function getAllTasks() public view returns (Task[] memory) 
	{
		Task[] memory alltasks = new Task[](taskIds.length);
		for(uint i=0;i<taskIds.length;i++) {
			alltasks[i] = tasks[taskIds[i]];
		}
		return alltasks;
	}


	function getTaskCount() public view returns (uint) {
		return taskCount;

	}
}



