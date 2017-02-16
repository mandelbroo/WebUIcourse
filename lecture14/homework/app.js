var usersList = $('#usersListNode')
var userInfoNode = $('#userInfoNode')
var template = $('#userInfoTemplate').html()
var listTemplate = $('#listTemplate').html()
var selectedUser

var API_URL = 'http://heedio.me:8383'

getUsers()

function getUsers() {
  //var URL = 'http://localhost:3000/users'
  get(API_URL).then(function(data){
    users = JSON.parse(data)
    drawUsers(users)
  })
}

function get(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = function() {
      if (request.status === 200) {
        resolve(request.response)
      } else {
        reject(Error('Image didn\'t load successfully error code:' + request.statusText))
      }
    }
    request.onerror = function(err) {
      reject(Error('There was a network error.'))
    }
    request.send()
  })
}

function readForm() {
  var user = {
    name: getInputValue('userFormName'),
    second: getInputValue('userFormLastame'),
    avatar: getInputValue('userFormAvatar'),
    info: getInputValue('userFormInfo'),
    newfield: getInputValue('userFormNewfield')
  }
  return user
}
function getInputValue(id) {
  var input = document.querySelector(`#${id}`)
  if (input)
    return input.value
  return ''
}

function post(url, data) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.onload = function() {
      if (request.status === 200) {
        resolve(request.response)
      } else {
        reject(Error('Image didn\'t load successfully error code:' + request.statusText))
      }
    }
    request.onerror = function(err) {
      reject(Error('There was a network error.'))
    }
    request.send(JSON.stringify(data))
  })
}

function drawUsers(users) {
  users.forEach(drawOneUser)
}

var userFormTemplate = $('#userFormTemplate')[0]
var addButton = $('#addButton')
addButton.on('click', function(){
  userInfoNode.html(userFormTemplate.innerHTML)
})
var saveButton = $('#saveButton')

saveButton.on('click', function(){
  var user = readForm()
  post(API_URL, user)
})

function drawOneUser(user, index) {
  var item = $(document.createElement('li'))
  item.text(index + ':' + user.name)
  item.addClass('user')
  item.click(function() {
    clickOnUser(user)
  })
  usersList.append(item)
}

function clickOnUser(user) {
  if (selectedUser)
    selectedUser.removeClass('userActive')
  var selectedUser = $(this)
  selectedUser.addClass('userActive')
  setUserInfo(user)
}

function setUserInfo(user) {
  var newTemplate = template
  var newContent = Mustache.to_html(template, user)
  userInfoNode.html(newContent)
}

function mustachifyList(name, template, items) {
  var object = {name: name, items: items.map(function(x) {
      return {item: x}
    })
  }
  return Mustache.to_html(template, object)
}
