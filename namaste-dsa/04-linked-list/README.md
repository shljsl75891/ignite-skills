## Linked List

Linked List is a linear datastructure. In this, each element is a node which contains data as well as reference of other similar nodes.

#### Types of Linked List

- Singly Linked List
- Doubly Linked List

![](/assets/2026-03-19-08-23-50.png)

#### Differences

| Linked List                        | Array                               |
| ---------------------------------- | ----------------------------------- |
| Non Contiguous                     | Contiguous                          |
| Dynamic Size                       | Fixed Size                          |
| Accessing any node O(n)            | Accessing element O(1)              |
| Extra Memory required for pointers | No Extra Memory other than values   |
| Insertion of new node is easy O(1) | Insertion of element is tricky O(n) |
| Deletion of a node is easyO(1)     | Deletion of element is tricky O(n)  |
| Value + Pointer                    | Value Only                          |

We can create a linked list node using constructor functions in JS.

> [!TIP]
> In JavaScript, a constructor function is used with the `new` keyword to create and initialize new object instances.
>
> ```js
> function Node(val) {
>   // "this" here refers to a new empty object initialized by JS when `new` keyword is used, and its prototype "Object" prototype
>   this.val = val;
>   this.next = null;
> }
>
> const node1 = new Node(5);
> const node2 = new Node(7);
>
> node1.next = node2;
>
> console.log(node1);
> ```
>
> **ES2015+ (Class Syntax) Equivalent:**
>
> ```js
> // Although, the same thing is happening behind the scenes
> class Node {
>   constructor(val) {
>     this.val = val;
>     this.next = null;
>   }
> }
>
> const node1 = new Node(5);
> const node2 = new Node(7);
>
> node1.next = node2;
>
> console.log(node1);
> ```

#### Patterns

###### Floyd's Algorithm (Tortoise & Hare)

Two-pointer technique using slow and fast pointers.

- [Middle of Linked List](./03-middle-of-list.js)
- [Linked List Cycle](./04-linked-list-cycle.js)

###### Intersection of two different linked lists

![](/assets/2026-03-20-12-40-38.png)
The analogy basically is that if two runners have same destination point, but different distance cover. Then, to make sure that they reach destination point at the same time with same speed, their corresponding starting points must be different as per above image. So, the runner who has to cover more distance need to be placed ahead of the runner who has to cover small distance. Eventually, the distance would be then same.

> [!TIP]
> Use dummy node when operation might touch the head or when you want same logic for every node (avoid edge cases). Otherwise, without it, we would need special `if head...` case.
> Typical problems using dummy
>
> - Remove Nth node from end
> - Swap nodes in pairs
> - Reverse nodes in k group
> - Merge two sorted lists
> - Partition list
