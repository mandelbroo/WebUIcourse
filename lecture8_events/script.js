var root1 = document.getElementById('root1')
var root2 = document.getElementById('root2')
var button = document.getElementById('button')
var par1 = document.getElementById('par1')

// button.addEventListener('click', function(e) {
//   console.log('button clicked')
//   e.stopPropagation()
// })

root1.addEventListener('click', function(e) {
  console.log('root1 clicked')
  this.style.height = '20px'
  this.style.overflow = 'hidden'
}, true)

par1.addEventListener('click', function(e) {
  //Event delegation in action
  console.log('par1 clicked')
  // e.stopPropagation()
  // document.dispatchEvent(new MouseEvent('click'))
  if (e.target.tagName == 'BUTTON') {
    console.log(e.target.id, 'clicked')
    e.stopPropagation()
  }
}, true)

document.addEventListener('click', function(e) {
  console.log('document clicked', e.clientX)
}, true)

var newButton = document.createElement('button')
newButton.id = 'button3'
par1.appendChild(newButton)
