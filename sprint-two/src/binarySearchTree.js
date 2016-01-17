var BinarySearchTree = function(value) {
  this.left;
  this.right;
  this._depth = 0;
  this.value = value;
};

BinarySearchTree.prototype.size = 0;

BinarySearchTree.prototype.insert = function(value) {
  function inputNode(node) {
    var child = value > node.value ? 'right' : 'left'; 
    if (node[child]) {
      inputNode(node[child]);
    } else {
      BinarySearchTree.prototype.size++;
      node[child] = new BinarySearchTree(value);
      node[child]._depth = node._depth + 1;
    }
  }

  inputNode(this);
  if(this.size > 5 && !this._balanceCheck(this)) {
    this._balanceTree();
  } 
};

BinarySearchTree.prototype.contains = function(target) {
  if (this.value === target) {
    return true;
  } 
  if (target > this.value && this.right) {
    return this.right.contains(target);
  } else if (target < this.value && this.left) {
    return this.left.contains(target);
  } else {
    return false;
  }
};

BinarySearchTree.prototype.depthFirstLog = function(func) {
  func(this.value);
  if (this.left) {
    this.left.depthFirstLog(func);                                                                                                                                
  }
  if (this.right) {
    this.right 
    .depthFirstLog(func);
  }
};

BinarySearchTree.prototype.breadthFirstLog = function(func) {
  var breadthFirstTraverse = function(node) {
    func(node.value);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    queue.shift();
    if (queue.length > 0) {
      breadthFirstTraverse(queue[0]);  
    }
  };

  var queue = [this];
  breadthFirstTraverse(queue[0]);
};

BinarySearchTree.prototype._balanceTree = function() {
  // Adapted Day-Stout-Warren tree balancing algorithm
  var pseudoNode = new BinarySearchTree(undefined);
  pseudoNode.right = this;
  var root = pseudoNode._retrieveSortedList();
  var leaves = this.size + 1 - Math.pow(2, Math.floor(Math.log2(this.size + 1)));
  root._listToTree(leaves);
  var tempSize = this.size - leaves;
  while (tempSize > 1) {
    root._listToTree(Math.floor(tempSize / 2));
    tempSize = Math.floor(tempSize / 2);
  }
};

BinarySearchTree.prototype._retrieveSortedList = function() {
  var tail = this;
  var rest = this.right;
  while (rest) {
    if (!rest.left) {
      tail = rest;
      rest = rest.right;
    } else {
      var temp = rest.left;
      rest.left = temp.right;
      temp.right = rest;
      rest = temp;
      tail.right = rest;
    }
  }
  return this;
};

BinarySearchTree.prototype._listToTree = function(count) {
  var pointer = this;
  for (var i = 0; i < count; i++) {
    var child = pointer.right;
    pointer.right = child.right;
    pointer = child.right;
    child.right = pointer.left;
    pointer.left = child;
  }
};

BinarySearchTree.prototype._balanceCheck = function(node) {
  if (!node) {
    return 1;
  }
  var left = this._balanceCheck(node.left);
  var right = this._balanceCheck(node.right);

  if (left && right) {
    if (left / right > 2 || left / right < 0.5) {
      return false;
    } else {
      return 1 + Math.max(left, right);
    }
  } else {
    return false;
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 *  insert: O(log(n))
 *  contains: O(log(n))
 *  depthFirstLog: O(n)
 */
