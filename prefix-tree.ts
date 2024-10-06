/* 
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
    Trie() Initializes the trie object.
    void insert(String word) Inserts the string word into the trie.
    boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
    boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
*/

class TrieNode {
  isWord: boolean
  char: string
  children: TrieNode[]
  constructor (char: string)  {
    this.children = []
    this.char = char
  }
}

class Trie {
    root: TrieNode
    constructor() {
      this.root = new TrieNode("")
    }

    insert(word: string): void {
      function helper (word: string, currentNode: TrieNode) {
        if(word.length === 0) return
        const firstChar = word[0]
        let child = currentNode.children.find((n) => n.char === firstChar)
        if(!child) {
          child = new TrieNode(firstChar)
          currentNode.children.push(child)
        }
        if(word.length === 1) child.isWord = true // Last character, mark as word
        helper(word.slice(1, word.length), child)
      }
      helper(word, this.root)
    }

    // Our traversal function traverses the tree until the input string is empty. If it does that it knows that
    // we've been able to enter a node whose character matches the last character in our string, and whose parents
    // all match the other characters, so we call our callback. If we can't find a matching child, it means we cannot 
    // find the next character, so return false early.
    _traverse (word: string, currentNode: TrieNode, checkFn: (n: TrieNode) => boolean) {
      if(word.length === 0) return checkFn(currentNode)
      const firstChar = word[0]
      let child = currentNode.children.find((n) => n.char === firstChar)
      if(!child) return false
      return this._traverse(word.slice(1, word.length), child, checkFn)
    }

    // If we empty out our string it means we've landed on the node where the last character matches our string's
    // last character, return true if it's a word
    search(word: string): boolean {
      return this._traverse(word, this.root, (currentNode) => !!currentNode.isWord)
    }

    // If we are able to empty out our string it means we've found our prefix, return true
    startsWith(prefix: string): boolean {
      return this._traverse(prefix, this.root, (_) => true)
    }
}

const t = new Trie()
t.insert("done")
console.log(t.startsWith("do"))
console.log(t.startsWith("d"))
console.log(t.search("done"))
