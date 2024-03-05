function createLink(val) {
    this.val = val
    this.next = null
}

createLink.prototype.addNode = function(val) {
    this.next = new createLink(val)
    return this.next
}

let lList = new createLink(5) 
const head = lList
lList = lList.addNode(6)
lList = lList.addNode(7)
lList = lList.addNode(18)
lList = lList.addNode(1)

console.log(head)