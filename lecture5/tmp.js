
function buildScheme(selector) {
  var chunks = selector.split(" ")
  var scheme = []
  for(var i = 0; i < chunks.length; i++) {
    if (chunks[i].includes("#")) {
      scheme.push("#")
    }
    else if (chunks[i].includes(".")) {
      scheme.push(".")
    }
    else {
      scheme.push("tag")
    }
  }
  return scheme
}

function initStruct(selector) {
  var structure = {}
  var chunks = selector.split(" ")
  p(chunks.length)
  for (var i = 0; i < chunks.length; i++) {
    structure[chunks[i] + "___"+ i] = null
  }
  var structObject = {structure: structure}
  structObject.getKey = function(index) {return Object.keys(this.structure)[index]}
  structObject.getValue = function(index) {return this.structure[Object.keys(this.structure)[index]]}
  structObject.length = function() {
    return Object.keys(this.structure).length
  }
  structObject.firstUnset = function() {
    return this.firstSetConf(false)
  }
  structObject.firstSet = function() {
    return this.firstSetConf()
  }
  structObject.firstSetConf = function(set = true) {
    for (var i = 0; i < this.length(); i++) {
      var value = this.getValue(i)
      if (isEmpty(value) === !set) {
        return this.getKey(i)
      }
    }
  }
  structObject.pureName = function(value) {
    var result = /___\d+/.exec(value)
    return value.replace(result, "")
  }
  structObject.firstUnsetTag = function() {
    return this.pureName(this.firstUnset())
  }
  structObject.firstSetTag = function() {
    return this.pureName(this.firstSet())
  }
  return structObject
}

function printTag(node, deepness) {
  //node.nodeType === 1
  if (node && node.tagName) {
    var space = ""
    if (deepness > 0) {
      space = Array(deepness).join("")
    }
    var id = node.attributes.length == 0 || isEmpty(node.attributes["id"]) ? "" : "#" + node.attributes["id"].value
    var className = node.classList.length == 0 || isEmpty(node.className) ? "" : "." + node.className
    p(space + node.tagName.toLowerCase() + id + className)
    return deepness++;
  }
  return 0
}

//old
function recursive(selector, node, result, deepness) {
  //deepness = printTag(node, deepness)

  if (node && node.tagName && selector == node.tagName.toLowerCase()) {
    result.push(node)
  }
  if (node && node.children) {
    node.children.forEach(function(childNode) {
      recursive(selector, childNode, result, deepness)
    })
  }
  return result
}
