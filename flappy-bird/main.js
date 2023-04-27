const config = {
  type: Phaser.AUTO,
  width: 288,
  height: 512,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let bird;
let pipes;
let firstClick = false;
let pipeGenerator;
let startText;
let score = 0;
let scoreText;

function preload() {
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
  this.load.image("background", "assets/background.png");
}

function create() {
  this.physics.pause();

  //Add background image and instruction text
  this.add.image(config.width / 2, config.height / 2, "background");
  startText = this.add.text(config.width / 2 - 110, 80, "Click to Begin!", {
    fontSize: 24,
    color: "#000000",
  });

  //Add Score Text
  scoreText = this.add.text(100, 40, "Score: 0", {
    fontSize: 18,
    color: "#000000",
  });
  scoreText.setDepth(3);

  //create bird and pipes group
  bird = this.physics.add.sprite(100, config.height / 2, "bird");
  pipes = this.physics.add.group();

  //create input for jumping, start pipe generator

  this.input.on("pointerdown", () => jump(this));
}

function update() {
  checkScore();

  //game over if you go out of bounds
  if (bird.body.top <= 0 || bird.body.bottom >= config.height) {
    gameOver.call(this);
  }
  // game over if you hit a pipe
  if (this.physics.overlap(bird, pipes)) {
    gameOver.call(this);
  }
}

// Helper functions
function createPipes() {
  //Create random position where pipes should be
  const pipeVerticalPosition = Phaser.Math.Between(50, config.height - 200);

  //create upper pipe and orient correctly
  const upperPipe = pipes.create(config.width, pipeVerticalPosition, "pipe");
  upperPipe.setOrigin(0, 1);
  upperPipe.body.allowGravity = false;
  upperPipe.setFlipY(true);
  upperPipe.setVelocityX(-200);

  //create lower pipe and orient correctly
  const lowerPipe = pipes.create(
    config.width,
    pipeVerticalPosition + 150,
    "pipe"
  );
  lowerPipe.setOrigin(0, 0);
  lowerPipe.body.allowGravity = false;
  lowerPipe.setVelocityX(-200);
}

function gameOver() {
  this.physics.pause();
  this.input.off("pointerdown");
  pipeGenerator.remove();

  this.input.once("pointerdown", restartGame, this);
}

function restartGame() {
  score = 0;
  firstClick = false;
  this.scene.restart();
}

function jump(scene) {
  if (!firstClick) {
    scene.physics.resume();
    firstClick = true;
    pipeGenerator = scene.time.addEvent({
      delay: 1500,
      callback: createPipes,
      callbackScope: scene,
      loop: true,
    });
    startText.destroy();
  }
  bird.setVelocityY(-400);
}

function checkScore() {
  pipes.getChildren().forEach((pipe) => {
    if (pipe.x + pipe.width < bird.x && !pipe.scored && pipe.flipY) {
      pipe.scored = true;
      score++;
      scoreText.setText("Score: " + score);
    }
  });
}
