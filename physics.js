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
  push(); // Save the current drawing style settings

  // Loop through the birds array in reverse order
  for (var i = birds.length - 1; i >= 0; i--) {
    var bird = birds[i]; // Get the current bird

    fill(225, 0, 0); // Set fill color to red (R: 0, G: 255, B: 0)
    drawVertices(bird.vertices); // Draw the bird using its vertices

    // Check if the bird is off-screen
    if (isOffScreen(bird)) {
      removeFromWorld(bird); // Remove the bird from the physics world
      birds.splice(i, 1); // Remove the bird from the birds array
    }
  }
  pop(); // Restore the previous drawing style settings
}
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  var boxSize = 80; // Size of each box
  var towerHeight = 6; // Number of rows in the tower
  var towerWidth = 3; // Number of columns in the tower
  var towerOffsetX = 200; // X-coordinate offset for the tower
  var towerOffsetY = height - towerHeight * boxSize - 20; // Y-coordinate offset for the tower
  // Calculates the Y-coordinate offset for the tower based on the canvas height, number of rows, box size, and additional spacing.
  

  // Loop through each row of the tower
  for (var row = 0; row < towerHeight; row++) {
    // Loop through each column of the tower
    for (var col = 0; col < towerWidth; col++) {
      var x = towerOffsetX + col * boxSize; // Calculate the x-coordinate of the current box
      var y = towerOffsetY + row * boxSize; // Calculate the y-coordinate of the current box

      var box = Bodies.rectangle(x, y, boxSize, boxSize); // Create a box body at the specified position and size
      boxes.push(box); // Add the box body to the boxes array

      // Generate a random shade of green for the box color
      var shadeOfGreen = color(random(50, 150), random(150, 255), random(50, 150));
      colors.push(shadeOfGreen); // Add the color to the colors array
    }
  }

  World.add(engine.world, boxes); // Add all the box bodies to the physics world
  }  

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    var color = colors[i];
    fill(color);
    drawVertices(box.vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
var birdX = 200; // X-coordinate of the slingshot bird
  var birdY = height - 100; // Y-coordinate of the slingshot bird
  var birdRadius = 20; // Radius of the slingshot bird

  // Create the slingshot bird as a circular body
  slingshotBird = Bodies.circle(birdX, birdY, birdRadius, {
    friction: 0,
    restitution: 0.95,
  });

  // Increase the mass of the slingshot bird
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  // Add the slingshot bird to the physics world
  World.add(engine.world, slingshotBird);

  // Set up the slingshot constraint options
  var constraintOptions = {
    bodyA: null,
    pointB: { x: birdX, y: birdY },
    stiffness: 0.01,
    damping: 0.0001,
  };

  // Create the slingshot constraint
  slingshotConstraint = Constraint.create(constraintOptions);

  // Add the slingshot constraint to the physics world
  World.add(engine.world, slingshotConstraint);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
push();
  
  // Draw the slingshot bird
  drawVertices(slingshotBird.vertices);

  // Draw the slingshot constraint
  drawConstraint(slingshotConstraint);

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
var countdown = 60; // Initial countdown time in seconds

function draw() {
  // ... (existing code)

  // Decrement the countdown
  countdown -= 1 / frameRate();

  // Display the countdown on the screen
  textSize(32);
  fill(255);
  text("Time: " + Math.ceil(countdown), 10, 50);

  // Check if the countdown reaches zero
  if (countdown <= 0) {
    // Stop the game or perform any necessary actions
    noLoop();

    // Display "GAME OVER" message
    textSize(64);
    fill(255, 0, 0);
    text("GAME OVER", width / 2 - 150, height / 2);
  }
}
