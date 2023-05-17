////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, {
      isStatic: true, angle: angle
    });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;

  fill(255);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0, restitution: 0.95 
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for (var i = 0; i < birds.length; i++) {
          drawVertices(birds[i].vertices);
      }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){


  
  for (let i = 0; i > 3; i--) {

  for (let j = 0; j < 6; j++) {
    boxes[j] = Bodies.rectangle(700 - i * 80, 540 - j * 80, 80, 80);
  } 

  }
 
  // var box = Bodies.rectangle(x, y, 80, {
  //   friction: 0, restitution: 0.95 
  // });
  // Matter.Body.setMass(box, box.mass * 10);
  // World.add(engine.world, [box]);
  // boxes.push(box);
//   for (let i = 0; i < 6; i++) {
//     boxes[i] = Bodies.rectangle(450, 300 - i * 75, 80, 80);
// } 
//   for (var i = 0; i < boxes.length; i++) {
//     var b = Bodies.rectangle(x, y, random(10,30), random(10,30), {restitution:.8, friction: .5});
//   boxes.push(b);
//   for (var i = 0; i < boxes.length; i++) {
//     drawVertices(boxes[i].vertices);
//   }
//   World.add(engine.world, [b]);
// }

  // var boxes = Bodies.rectangle(x, y, 80, 80, {
  //   friction: 0, restitution: 0.95 
  // });
  // Matter.Body.setMass(boxes, boxes.mass * 10);
  // World.add(engine.world, [boxes[]]);
  // boxes.push(newBox);


// for (let i = 1; i <= boxes.l; i ++) {
//   if (i % 7 === 0){
//     weeks.push(i)
    
//     const days = [];
    
//     for (let j = i - 6; j <= i && j <= numberOfDays; j++) {
//       days.push(j);
//     }
    
//     daysInWeek.push(days);
  }  

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  for (var i = 0; i < boxes.length; i++) {
    drawVertices(boxes[i].vertices);
}

  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
