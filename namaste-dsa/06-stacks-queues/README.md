## Stacks and Queues

- These data structures are used to store and organize data logically in a specific order.
- Whenever order of operations is important, we can use stacks and queues to manage the data efficiently.
- These data structures enforce restricted access to the data, which helps in maintaining the integrity of the data and ensures that the operations are performed in a specific order.

![](/assets/2026-03-29-18-02-34.png)

#### Real word applications

###### Stacks

- **Browser History**: When you navigate through web pages, the browser keeps track of the pages you have visited in a stack. When you click the back button, it pops the last page from the stack and takes you back to that page.
- **Undo Functionality**: In text editors or graphic design software, the undo and redo operations are implemented using stacks. When you perform an action, it is pushed onto the stack and when you undo, it pops the last action from the stack to revert it.
- **Books**: When you stack books on top of each other, the last book you place on the stack will be the first one you take off when you want to read it. This is a real-life example of a stack data structure.
- **Recursion**: In programming, when a function calls itself, it uses a stack to keep track of the function calls. Each time a function is called, it is pushed onto the stack, and when it returns, it is popped from the stack.

###### Queues

- **Ticket Counter**: It follows the FIFO (First In First Out) principle. The first person to arrive at the ticket counter will be the first one to get the ticket. The next person will be the second one to get the ticket, and so on.
- **OS Task Scheduling**: The operating system uses a queue to manage the tasks that are waiting to be executed. The first task that arrives will be the first one to be executed, and so on.
- **Printers**: The print jobs are managed in a queue. The first print job that is sent to the printer will be the first one to be printed, and so on.

> All the arrays in javascript have built-in methods that can be used to implement stacks and queues. For example, you can use the `push` and `pop` methods to implement a stack, and the `shift` and `unshift / pop` methods to implement a queue. However, it is important to understand the underlying principles of stacks and queues to use them effectively in your code.

#### Comaprison with other data structures

| Feature       | Stack        | Queue      | Array           | Linked List  | HashMap   |
| ------------- | ------------ | ---------- | --------------- | ------------ | --------- |
| Order         | LIFO         | FIFO       | Indexed         | Sequential   | Key-based |
| Random Access | ❌           | ❌         | ✅              | ❌           | ✅        |
| Insert/Delete | Top Only     | Ends Only  | Anywhere (Slow) | Anywhere     | By Key    |
| Use Case      | Backtracking | Scheduling | General purpose | Dynamic size | Lookup    |
