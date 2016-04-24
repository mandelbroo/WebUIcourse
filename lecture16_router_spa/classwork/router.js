
var content = document.querySelector('#content')
var router = {
  index: function(){
    content.innerHTML = 'index page'
  },
  users: function(){
    content.innerHTML = ''
    console.log('users page')
    var template = getTemplate()
    getUsers().forEach(function(user){
      content.innerHTML += render(user, template)
    })
  },
  about: function(){
    content.innerHTML = 'about page'
  },
}

function getUsers(){
  var result = makeRequest('http://heedio.me:8383')
  var usersArray = JSON.parse(result)
  return usersArray
}

function getTemplate(){
  return makeRequest('http://heedio.me:8383/template')
}
function makeRequest(url) {
  var request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)
  if (request.status === 200) {
    var result = request.responseText
  }
  return result
}

function render(user, template) {
  if (user && template) {
    var newContent = template;
    var fields = Object.keys(user);
    fields.forEach(function(fieldName) {
      newContent = newContent.replace('{{' + fieldName + '}}', user[fieldName]);
    });

    return newContent;
  }
}
