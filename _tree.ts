export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export function makeTree(): TreeNode {
  const root = new TreeNode(12);
  root.left = new TreeNode(2);
  root.right = new TreeNode(30);
  return root;
}


export function makeLargeTree(): TreeNode {
  const root = new TreeNode(8);
  root.left = new TreeNode(6);
  root.left.left = new TreeNode(5)
  root.left.right = new TreeNode(7)
  root.right = new TreeNode(10);
  root.right.left = new TreeNode(9);
  root.right.right = new TreeNode(11);
  return root;
}

export function makeBinaryTree (): TreeNode {
  const root = new TreeNode(5);
  root.left = new TreeNode(4);
  root.right = new TreeNode(8);
  root.left.left = new TreeNode(11);
  root.left.left.left = new TreeNode(7);
  root.left.left.right = new TreeNode(2);
  root.right = new TreeNode(8);
  root.right.left = new TreeNode(13);
  root.right.right = new TreeNode(4);
  root.right.right.right = new TreeNode(1);
  root.right.right.left = new TreeNode(5);
  return root
}
