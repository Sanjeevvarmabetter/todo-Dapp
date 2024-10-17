async function main() {
	const TodoList = await ethers.getContractFactory("TodoList");
	const todoList = await TodoList.deploy();
	await todoList.deployed();
	console.log("TodoList contract deployed to:", todoList.address);
  }
  
  main()
	.then(() => process.exit(0))
	.catch(error => {
	  console.error(error);
	  process.exit(1);
	});
  

	//old deployed transaction
//	0x1f76ba87fa309A14027e5c9136d35EEB8414001E

// new transaction
// 0x632C0C71a9fB1C318fBFb84D0C9f7E449a650cbc