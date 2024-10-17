import React, { useState, useEffect } from "react";  
import { ethers } from "ethers";
import abi from "./TodoList.json"; 
import './App.css';
import Header from "./components/Header";
function App() { 
  const [account, setAccount] = useState(null);
  const [todoContract, setTodoContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskContent, setTaskContent] = useState('');
  const [loading, setLoading] = useState(false);

  const contractAddress = '0x632C0C71a9fB1C318fBFb84D0C9f7E449a650cbc';  

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    setTodoContract(contract);

    const taskCount = await contract.getTaskCount();
    const taskList = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.tasks(i);
      taskList.push(task);
    }
    setTasks(taskList);
  };

  const createTask = async () => {
    if (!taskContent) return;
    setLoading(true);
    const tx = await todoContract.createTask(taskContent);
    await tx.wait();
    setLoading(false);
    setTaskContent('');
    loadBlockchainData();  
  };

  const toggleComplete = async (id) => {
    setLoading(true);
    const tx = await todoContract.completeTask(id);
    await tx.wait();
    setLoading(false);
    loadBlockchainData();  
  };

  useEffect(() => {
    if (window.ethereum) {
      loadBlockchainData();
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {account ? (
          <div className="account-info">
            <p>Connected Account: <strong>{account}</strong></p>
          </div>
        ) : (
          <button className="connect-button" onClick={loadBlockchainData}>Connect Wallet</button>
        )}

        <div className="task-creation">
          <input
            type="text"
            className="task-input"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Enter task content"
          />
          <button className="create-button" onClick={createTask} disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>

        <div className="task-list">
          <h2>Task List</h2>
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className={task.completed ? "task-completed" : "task-incomplete"}>
                  {task.content} - {task.completed ? 'Completed' : 'Incomplete'}
                  <button className="toggle-button" onClick={() => toggleComplete(task.id)}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;