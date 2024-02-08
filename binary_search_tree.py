class TreeNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


    def __str__(self):
        return str(self.key)


class BinarySearchTree:
    def __init__(self):
        self.root = None


    def insert(self,key):
        self.root = self._insert(self.root, key)


    def _insert(self, node, key):
        if node is None:
            return TreeNode(key)
        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:
            node.right = self._insert(node.right, key)
        return node


    def search(self, key):
        return self._search(self.root, key)


    def _search(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self._search(node.left, key)
        return self._search(node.right, key)
    

    def delete(self, key):
        self.root = self._delete(self.root, key)


    def _delete(self, node, key):
        if node is None:
            return node
        if key < node.key:
            node.left = self._delete(node.left, key)
        elif key > node.key:
            node.right = self._delete(node.right, key)
        else:
            if node.left is None:
                return node.right

            elif node.right is None:
                return node.left

            node.key = self._min_value(node.right)
            node.right = self._delete(node.right, node.key)
        return node


    def _min_value(self, node):
        while node.left is not None:
            node = node.left
        return node.key


    def inorder_traversal(self):
        result = []
        self._inorder_traversal(self.root, result)
        return result


    def _inorder_traversal(self, node, result):
        if node:
            self._inorder_traversal(node.left, result)
            result.append(node.key)
            self._inorder_traversal(node.right, result)


bst = BinarySearchTree()
nodes = list(input("Enter the nodes: ").split(' '))
nodes = list(map(int, nodes))

for node in nodes:
    bst.insert(node)
print("Inorder traversal:", bst.inorder_traversal())
sear = int(input("Enter the node to search: "))
print("Search:", bst.search(sear))
del_node = int(input("Enter the node to delete: "))
bst.delete(del_node)
print("Inorder traversal after deleting:", bst.inorder_traversal())
print("Search:", bst.search(del_node))