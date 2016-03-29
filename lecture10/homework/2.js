var users = [
  {
    name: 'John',
    info: 'likes bowling',
    second: 'Second',
    avatar: 'http://www.iconarchive.com/download/i51046/hopstarter/halloween-avatars/Jason.ico',
    newfield: 'asdasdasdasd',
  },
  {
    name: 'Pavel',
    info: 'plays footbal',
    second: 'Third',
    avatar: 'http://www.iconarchive.com/download/i51026/hopstarter/halloween-avatars/Alien.ico',
    newfield: 'asdasdasdasd',
  },
  {
    name: 'Igor',
    info: 'drinks a lot',
    second: 'Eleventh',
    avatar: 'http://files.softicons.com/download/internet-cons/halloween-avatars-icons-by-deleket/ico/Zombie%202.ico',
    newfield: 'asdasdasdasd',
  },
]

var usersList = document.getElementById('usersListNode')
var userDetailsNode = document.getElementById('userDetailsNode')
var userDetailsTemplate = document.getElementById('userDetailsTemplate').innerHTML
var selectedUser

function drawOneUser(user, index) {
  var item = document.createElement('li')
  item.innerHTML = user.name
  item.className = 'user'
  item.onclick = function() {
    if (this != selectedUser) {
      if (selectedUser)
        toggleUserNode(selectedUser)
      toggleUserNode(this)
      selectedUser = this
      user.renderFullInfo()
    }
  }
  return item
}

function toggleUserNode(userNode) {
  userNode.classList.toggle('userActive')
}

User = function(userData) {
  this._properties = userData
  this._propertiesNames = Object.keys(userData)
  var fields = Object.keys(userData)
  var self = this
  fields.forEach(function(field) {
    self[field] = userData[field]
  })
}

User.prototype = {
  renderSmallInfo: function(parent) {
    var userNode = drawOneUser(this)
    parent.appendChild(userNode)
  },
  renderFullInfo: function() {
    var properties = this._properties
    var newContent = userDetailsTemplate
    this._propertiesNames.forEach(function(propName) {
      newContent = newContent.replace('{{' + propName + '}}', properties[propName])
    })
    userDetailsNode.innerHTML = newContent
  },
}
