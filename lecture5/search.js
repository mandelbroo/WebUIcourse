/*
  author: Vitaliy
  search nodes within dom
  use space " " to divide tag names, class names, ids
*/

//testing
function test() {
  t("div")
  t("div div")
  t("div div a", false)
  t("div div p a")
  t("#link1")
  t(".header .container")
  t("div div #id .class #id", false)
  t(".header .container p #link1")

  t("div.header")
}
function t(query, expected = true) {
  p($$$(query))
  p(" expected " + (expected ? "ok" : "empty"))
  p("-------------------------------------------")
}
//testing end

//utils
function p(message) {
  console.log(message)
}
function isEmpty(value) {
  return value === undefined || value === null || value === ""
}
function isEmptyArray(value) {
  var result = isEmpty(value)
  result |= value.length == 0
  return result
}
function isPresent(value) {
  return !isEmpty(value)
}
//utils end

function $$$(selector = "") {
  p("find \"" + selector + "\"")
  if (isEmpty(selector)) {return}
  var query = selector.toLowerCase()
  var result = recursive(query, document, [])
  return result
}


function recursive(selector, node, result) {
  if (compare(selector, node)) {
    result.push(node)
  }
  if (node && node.children) {
    for (var i = 0; i < node.children.length; i++) {
      recursive(selector, node.children[i], result)
    }
  }
  return result
}

function compare(selector, element) {
  var chunks = selector.split(" ")
  var reversed = chunks.reverse()
  var el = element
  var row = []
  var i = 0
  reversed.forEach(function(item) {
    row[i] = isItFit(item, el)
    if (row[i] === false)
      return
    if (!isEmpty(el.parentNode, true))
      el = el.parentNode
    i++
  })
  return row.length == 0 || row.includes(false) || row.length != chunks.length ? null : element
}

function isItFit(identifier, element) {
  if (identifier.includes("#")) {
    return isPresent(element.attributes) && isPresent(element.attributes["id"]) && element.attributes["id"].value === identifier.replace("#", "")
  }
  else if (identifier.includes(".")) {
    return isPresent(element.classList, true) && element.classList.contains(identifier.replace(".", ""))
  }
  else {
    return isPresent(element.tagName) && element.tagName.toLowerCase() === identifier
  }
}
