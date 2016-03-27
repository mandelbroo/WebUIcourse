var listeners = []

function listen(giveEventName, givenCallback) {
  listeners.push({
    eventName: giveEventName,
    callback: givenCallback
  })
}

function trigger(triggeredEventName, eventData) {
  listeners.forEach(function(listener) {
    if (triggeredEventName == listener.eventName)
      listener.callback(eventData)
  })
}

var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")
var block1 = document.querySelector("#block1")
var block2 = document.querySelector("#block2")
var numMessages = document.querySelector("#numMessages")
var senderName = document.querySelector("#senderName")
var messageText = document.querySelector("#messageText")

button1.addEventListener('click', function(e) {
  var eventData = {from: 'John', message: "Ping"}
  trigger('new-message', eventData)
})


button2.addEventListener('click', function(e) {
  var eventData = {from: 'Bill', message: "Pong!"}
  trigger('new-message', eventData)
})

var numOfMessages = 0

listen('new-message', function block1reaction(message){
  numOfMessages++
  numMessages.innerHTML = numOfMessages
  senderName.innerHTML = message.from
  messageText.innerHTML = message.message
})

listen('new-message', function block2reaction(message){
  senderName.innerHTML = message.from
  messageText.innerHTML = message.message
})
