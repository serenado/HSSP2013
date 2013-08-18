var c = canvas.getContext('2d'),
    ship = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: 0,
      dy: 0,
      radius: 10
    },
    pullStrength = 0.5,
    dampening = 0.9,
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DOWN = 40,
    SPACE = 32,
    keys = {},
    asteroids = [],
    numAsteroids = 10;


function drawShip(){
  c.beginPath();
  c.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2);
  c.fill();
}

function moveShip(){
  ship.x += ship.dx;
  ship.y += ship.dy;
  
  ship.dx *= dampening;
  ship.dy *= dampening;
}

function createAsteroids(){
  var i;
  for(i = 0; i < numAsteroids; i++){
    asteroids.push({
      x: Math.random() * canvas.width,
      y: 0,
      dx: Math.random() - 0.5,
      dy: Math.random(),
      radius: Math.random() * 50
    });
  }
}

function drawAsteroid(asteroid){
  c.beginPath();
  c.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
  c.fill();
}

function moveAsteroid(asteroid){
  asteroid.x += asteroid.dx;
  asteroid.y += asteroid.dy;
}

function redraw(){
  var key, i, asteroid;
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  drawShip();
  moveShip();
  
  for(i = 0; i < numAsteroids; i++){
    asteroid = asteroids[i];
    drawAsteroid(asteroid);
    moveAsteroid(asteroid);
  }
  
  
  for(key in keys){
    key = parseInt(key, 10);
    if(key){
      switch(key){
        case LEFT:
          ship.dx -= pullStrength;
          break;
        case RIGHT:
          ship.dx += pullStrength;
          break;
        case UP:
          ship.dy -= pullStrength;
          break;
        case DOWN:
          ship.dy += pullStrength;
          break;
        case SPACE:
          console.log('space');
          break;
      }
    }
  }
  //console.log(keys);
  requestAnimationFrame(redraw);
}

window.addEventListener('keydown', function(event){
  keys[event.keyCode] = true;
  event.preventDefault();
});

window.addEventListener('keyup', function(event){
  delete keys[event.keyCode];
});

createAsteroids();
redraw();