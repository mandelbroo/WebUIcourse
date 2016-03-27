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
  var message = beautifyMessage(eventData)
  appendLoger(message)
}

var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")
var block1 = document.querySelector("#block1")
var block2 = document.querySelector("#block2")
var numMessages = document.querySelector("#numMessages")
var senderName = document.querySelector("#senderName")
var messageText = document.querySelector("#messageText")

button1.addEventListener('click', function(e) {
  var eventData = {from: 'John', text: "Ping", time: getTime()}
  trigger('new-message', eventData)
})

button2.addEventListener('click', function(e) {
  var eventData = {from: 'Bill', text: "Pong!", time: getTime()}
  trigger('new-message', eventData)
})

var numOfMessages = 0

listen('new-message', function block1reaction(message){
  numOfMessages++
  numMessages.innerHTML = numOfMessages
  senderName.innerHTML = message.from
  messageText.innerHTML = message.text
})

listen('new-message', function block2reaction(message){
  senderName.innerHTML = message.from
  messageText.innerHTML = message.text
})

function appendLoger(text) {
  var logPane = document.querySelector("#log")
  var newLogRecord = document.createElement("div")
  newLogRecord.innerHTML = text
  if (logPane.children.length > 0)
    logPane.insertBefore(newLogRecord, logPane.childNodes[0])
  else
    logPane.appendChild(newLogRecord)
}

function beautifyMessage(message) {
  return "[" + message.time + "]" + message.from + ": " + message.text
}

function getTime() {
  var now = new Date(Date.now())
  var hour = now.getHours()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  hour = addZero(hour)
  min = addZero(min)
  sec = addZero(sec)
  return hour + ":" + min + ":" + sec
}

function addZero(number) {
  if (number < 10)
    return number = "0" + number
  return number
}
