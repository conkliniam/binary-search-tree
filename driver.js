import Tree from "./tree.js";

// 1. Create a binary search tree from an array of random numbers < 100.
let bst = Tree(createRandomIntegerArray(7, 100));
bst.print();
// 2. Confirm that the tree is balanced by calling isBalanced.
checkBalance(bst);
// 3. Print out all elements in level, pre, post, and in order.
printAll(bst);
// 4. Unbalance the tree by adding several numbers > 100.
for (let num = 101; num < 109; num++) {
  bst.insert(num);
}
bst.print();
// 5. Confirm that the tree is unbalanced by calling isBalanced.
checkBalance(bst);
// 6. Balance the tree by calling rebalance.
console.log("Rebalancing...");
bst.rebalance();
bst.print();
// 7. Confirm that the tree is balanced by calling isBalanced.
checkBalance(bst);
// 8. Print out all elements in level, pre, post, and in order.
printAll(bst);

function createRandomIntegerArray(length, maxSize) {
  let arr = [];

  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * maxSize);
  }

  return arr;
}

function printAll(binaryTree) {
  let numbers = [];
  binaryTree.levelOrder((node) => numbers.push(node.data));
  console.log(`Level Order: ${JSON.stringify(numbers)}`);

  numbers = [];
  binaryTree.preOrder((node) => numbers.push(node.data));
  console.log(`Pre Order: ${JSON.stringify(numbers)}`);

  numbers = [];
  binaryTree.postOrder((node) => numbers.push(node.data));
  console.log(`Post Order: ${JSON.stringify(numbers)}`);

  numbers = [];
  binaryTree.inOrder((node) => numbers.push(node.data));
  console.log(`In Order: ${JSON.stringify(numbers)}`);
}

function checkBalance(binaryTree) {
  console.log(`Tree is balanced: ${binaryTree.isBalanced() ? "yes" : "no"}`);
}
