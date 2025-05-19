import Node from "./node.js";

function Tree(arr) {
  let _root = buildTree(arr);
  return {
    root: () => _root,

    print: () => {
      prettyPrint(_root);
    },
    insert: (value) => {
      if (_root === null) {
        _root = Node(value);
        return;
      }

      let node = _root;
      let done = false;

      while (node.data !== value && !done) {
        if (node.data > value) {
          if (node.left !== null) {
            node = node.left;
          } else {
            node.left = Node(value);
            done = true;
          }
        } else {
          if (node.right !== null) {
            node = node.right;
          } else {
            node.right = Node(value);
            done = true;
          }
        }
      }
    },
    deleteItem: (value) => {
      if (_root === null) {
        return;
      }

      if (_root.data === value) {
        _root = deleteNode(_root);
      } else if (value < _root.data) {
        deleteFromTree(_root, _root.left, value, true);
      } else if (_root.data < value) {
        deleteFromTree(_root, _root.right, value, false);
      }
    },
    find: (value) => {
      return findValue(_root, value);
    },
    levelOrder: (callback = null) => {
      checkCallbackIsFunction(callback);

      let unvisited = [];
      if (_root !== null) {
        unvisited.push(_root);
      }

      while (unvisited.length > 0) {
        let next = unvisited.shift();
        callback(next);

        if (next.left !== null) {
          unvisited.push(next.left);
        }

        if (next.right !== null) {
          unvisited.push(next.right);
        }
      }
    },
    inOrder: (callback = null) => {
      checkCallbackIsFunction(callback);

      recursiveInOrder(_root, callback);
    },
    preOrder: (callback = null) => {
      checkCallbackIsFunction(callback);

      recursivePreOrder(_root, callback);
    },
    postOrder: (callback = null) => {
      checkCallbackIsFunction(callback);

      recursivePostOrder(_root, callback);
    },
    height: (value) => {
      let node = findValue(_root, value);

      if (node === null) {
        return null;
      }

      return recursiveHeight(node);
    },
    depth: (value) => {
      if (_root === null) {
        return null;
      }

      let node = _root;
      let depth = 0;

      while (node.data !== value) {
        if (value < node.data) {
          if (node.left !== null) {
            node = node.left;
            depth++;
          } else {
            return null;
          }
        } else {
          if (node.right !== null) {
            node = node.right;
            depth++;
          } else {
            return null;
          }
        }
      }

      return depth;
    },
    isBalanced: () => {
      return recursiveIsBalanced(_root);
    },
    rebalance: () => {
      let sortedItems = [];
      recursiveInOrder(_root, (node) => sortedItems.push(node.data));
      _root = buildTreeFromSorted(sortedItems);
    },
  };
}

// pretty print function copied from
// https://www.theodinproject.com/lessons/javascript-binary-search-trees
function prettyPrint(root, prefix = "", isLeft = true) {
  if (root === null) {
    return;
  }
  if (root.right !== null) {
    prettyPrint(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.data}`);
  if (root.left !== null) {
    prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function recursiveIsBalanced(node) {
  if ((node.left === null) & (node.right === null)) {
    return true;
  }

  let leftHeight = 0;
  let rightHeight = 0;

  if (node.left !== null) {
    if (!recursiveIsBalanced(node.left)) {
      return false;
    }

    leftHeight = 1 + recursiveHeight(node.left);
  }

  if (node.right !== null) {
    if (!recursiveIsBalanced(node.right)) {
      return false;
    }

    rightHeight = 1 + recursiveHeight(node.right);
  }

  return Math.abs(leftHeight - rightHeight) <= 1;
}

function findValue(root, value) {
  let node = root;

  while (node !== null && node.data !== value) {
    if (value < node.data) {
      node = node.left;
    } else if (node.data < value) {
      node = node.right;
    }
  }

  return node;
}

function checkCallbackIsFunction(callback) {
  if (typeof callback !== "function") {
    throw Error("Callback function is required");
  }
}

function recursiveInOrder(node, callback) {
  if (node === null) {
    return;
  }

  recursiveInOrder(node.left, callback);
  callback(node);
  recursiveInOrder(node.right, callback);
}

function recursivePreOrder(node, callback) {
  if (node === null) {
    return;
  }

  callback(node);
  recursivePreOrder(node.left, callback);
  recursivePreOrder(node.right, callback);
}

function recursivePostOrder(node, callback) {
  if (node === null) {
    return;
  }

  recursivePostOrder(node.left, callback);
  recursivePostOrder(node.right, callback);
  callback(node);
}

function recursiveHeight(node) {
  if (node.left === null && node.right === null) {
    return 0;
  }

  let leftHeight = 0;
  let rightHeight = 0;
  if (node.left !== null) {
    leftHeight = recursiveHeight(node.left) + 1;
  }

  if (node.right !== null) {
    rightHeight = recursiveHeight(node.right) + 1;
  }

  if (leftHeight > rightHeight) {
    return leftHeight;
  } else {
    return rightHeight;
  }
}

function deleteFromTree(parent, node, value, isLeft = true) {
  if (node === null) {
    return null;
  } else if (node.data === value) {
    if (isLeft) {
      parent.left = deleteNode(node);
    } else {
      parent.right = deleteNode(node);
    }
  } else if (value < node.data) {
    deleteFromTree(node, node.left, value, true);
  } else if (node.data < value) {
    deleteFromTree(node, node.right, value, false);
  }
}

function deleteNode(node) {
  if (node.left === null && node.right === null) {
    return null;
  } else if (node.left === null || node.right === null) {
    if (node.left !== null) {
      return node.left;
    } else if (node.right !== null) {
      return node.right;
    }
  } else {
    let parent = null;
    let child = node.right;

    while (child.left !== null) {
      parent = child;
      child = child.left;
    }

    if (parent !== null) {
      if (child.right !== null) {
        parent.left = child.right;
      } else {
        parent.left = null;
      }
      child.right = node.right;
    }

    child.left = node.left;
    return child;
  }
}

function buildTree(arr) {
  let sorted = [...arr]
    .sort((a, b) => a - b)
    .reduce((accum, val) => {
      if (accum[accum.length - 1] !== val) {
        accum.push(val);
      }
      return accum;
    }, []);

  return buildTreeFromSorted(sorted);
}

function buildTreeFromSorted(sorted) {
  let root = createNodeFromMiddle(sorted);

  if (root === null) {
    return null;
  }

  let queue = [{ node: root, range: [0, sorted.length - 1] }];
  let frontIndex = 0;
  let limit = 20;

  while ((queue.length !== 0) & (limit > 0)) {
    let node = queue[frontIndex].node;
    let [start, end] = queue[frontIndex].range;
    queue.splice(frontIndex, 1);
    let mid = Math.floor((end + start) / 2);

    if (mid > start) {
      let newEnd = mid - 1;
      let left = createNodeFromMiddle(sorted, start, newEnd);
      node.left = left;

      if (start !== newEnd) {
        queue.push({ node: left, range: [start, newEnd] });
      }
    }

    if (mid < end) {
      let newStart = mid + 1;
      let right = createNodeFromMiddle(sorted, newStart, end);
      node.right = right;

      if (newStart !== end) {
        queue.push({ node: right, range: [newStart, end] });
      }
    }
    limit--;
  }

  return root;
}

function createNodeFromMiddle(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }

  let mid = Math.floor((end + start) / 2);
  return Node(arr[mid]);
}

export default Tree;
