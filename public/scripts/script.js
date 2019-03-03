var h1 = document.querySelector('h1');
var message = document.querySelector('#message-display');
var messageBar = document.querySelector('#messages');
var reset = document.querySelector('#reset');
var mode = document.querySelectorAll('.mode');
var life = document.querySelector('#life');
var streak = document.querySelector('#streak');
var circles = document.getElementsByClassName('color-circle');

var colors = [];
var mistake = false;
var lifeCount = 3;
var streakCount = 0;
var numP = circles.length;
var pickedColor  = pickColor(colors);

init();

reset.addEventListener('click', function(){
  reload();
});

function init() {
  selectMode();
  
  for(var i = 0; i<circles.length; i++){
    // circles[i].addEventListener('mouseenter', function(){
    //   console.log(this.style.backgroundColor);
    // })
    circles[i].addEventListener('click', function(){
      var ownColor = this.style.backgroundColor;
      // correct
      if(ownColor === pickedColor){
        h1.style.backgroundColor = ownColor;
        messages.style.backgroundColor = ownColor;
        for(var i = 0; i<circles.length; i++) {
            circles[i].style.background = pickedColor;
            circles[i].style.border = "0.5px solid white";
        }
        message.textContent = "correct!!"
        reset.textContent = 'play again ?'
        if(mistake === false) {
          streakCount += 1;
          streak.textContent = `Streak: ${streakCount}`;
          mistake = !mistake;
        }
      }
        // wrong
       else if(ownColor !== pickedColor && lifeCount > 0) {
        this.style.background = "#202122";
        this.style.border = "none";
        lifeCount -= 1;
        life.textContent = `Try: ${lifeCount}`;
       }
       if(lifeCount === 1 && !mode[1].classList[1]) {
         life.style.color = "red";
       }
        // dead
        if(lifeCount === 0) {
          for(var i = 0; i<circles.length; i++) {
            if(circles[i].style.background !== pickedColor) {
              circles[i].style.background = '#202122';
              circles[i].style.border = "none";
            }
          }
          mistake = !mistake;
          pickedColor = "";
          streakCount = 0;
          streak.textContent = `Streak: ${streakCount}`;
          messages.style.backgroundColor = "#202122";
          message.textContent = 'you failed, try again';
          reset.textContent = 'try again';
        } 
      })
  } 
  reload();
}

function selectMode(){
  for(var i = 0;i<mode.length; i++){
    mode[i].addEventListener('click', function(){
      mode[0].classList.remove('selected');
      mode[1].classList.remove('selected');
      this.classList.add('selected');
      reload();
    })
  }
}

function reload(){
  // console.log('hello')
  if(mode[0].classList[1] === 'selected'){
    colors = generateColor();
    lifeCount = 3;
  } else if(mode[1].classList[1] === 'selected') {
    colors = hardGenerateColor();
    lifeCount = 1;
  }
  mistake = false;
  pickedColor = pickColor(colors);
  h1.style.background = "#202122";
  h1.textContent = pickedColor.split(',').join('');
  message.textContent = '';
  messages.style.backgroundColor = "#202122";
  reset.textContent = 'new colors'; 
  life.style.color = "inherit";
  life.textContent = `Try: ${lifeCount}`;
  streak.textContent = `Streak: ${streakCount}`;
  for(var i = 0; i<circles.length; i++) {
    circles[i].style.border = "0.5px solid white";
    if(colors[i]) {
      circles[i].style.backgroundColor = colors[i]
    } else circles[i].style.display = "none";
      circles[i].style.background = colors[i];
  }
}

function randomRGB() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  
  return `rgb(${+r}, ${+g}, ${+b})`;
}

function hardRandomRGB() {
  var r = Math.floor(Math.random() * (255-50) + 50);
  var g = 0;
  var b = 0;
  var roll = Math.floor(Math.random() * 2);
  var op = roll === 1? '+' : '-';
  
  if(op === '+' ) {
    g = r + Math.floor(Math.random() * 20);
    g >= 256 ? g -= 25 : g;
    b = r + Math.floor(Math.random() * 15);
    b >= 256 ? g-= 20 : b;
  } else if (op === '-') {
    g = r - Math.floor(Math.random() * 15);
    b = r - Math.floor(Math.random() * 20);
  }
    return `rgb(${+r}, ${+g}, ${+b})`;
}

function generateColor(){
  var arr = [];
  
  for(var i = 0; i<numP; i++) {
    arr.push(randomRGB());
  } return arr;
}

function hardGenerateColor(){
  var arr = [];
  
  for(var i = 0; i<numP; i++){
    arr.push(hardRandomRGB());
  } return arr;
}

function pickColor(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}
