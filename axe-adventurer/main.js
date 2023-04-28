const config = {
  type: Phaser.AUTO,
  width: 576,
  height: 324,
  parent: "mygame",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 550 },
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

let cursors;
let lumberjack;
let mainCamera;
let spaceBar;

function preload() {
  this.cursors;
  this.load.image("swamp-tiles", "assets/world/world-tiles/Tileset.png");
  this.load.tilemapTiledJSON("map", "assets/world/world-tiles/tiles.json");
  this.load.image("background", "assets/world/Background.png");
  this.load.atlas(
    "lumberjack",
    "assets/character/spritesheet.png",
    "assets/character/sprites.json"
  );
}

function create() {
  //create cursor keys
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Set the world dimensions
  const worldWidth = 960;
  const worldHeight = 640;

  // Add background image at the center of the game world
  const backgroundImage = this.add.image(
    worldWidth / 2,
    worldHeight / 2,
    "background"
  );
  // Scale the background image to fit the entire game world
  backgroundImage.setScale(
    worldWidth / backgroundImage.width,
    worldHeight / backgroundImage.height
  );
  //create world
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("swamp", "swamp-tiles");
  const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
  worldLayer.setCollisionByExclusion([-1]);

  //create all animations for player
  this.anims.create({
    key: "standing",
    frames: this.anims.generateFrameNames("lumberjack", {
      prefix: "idle",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "running",
    frames: this.anims.generateFrameNames("lumberjack", {
      prefix: "run",
      start: 0,
      end: 5,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "jumping",
    frames: this.anims.generateFrameNames("lumberjack", {
      prefix: "jump",
      start: 0,
      end: 5,
      zeroPad: 3,
    }),
    frameRate: 6,
    repeat: 1,
  });

  lumberjack = this.physics.add.sprite(10, 20, "lumberjack");
  this.physics.add.collider(lumberjack, worldLayer);

  //create camera to follow player
  this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
  this.cameras.main.startFollow(lumberjack);
}

function update() {
  const isOnFloor = lumberjack.body.onFloor();

  if (cursors.right.isDown) {
    lumberjack.setVelocityX(200);
    if (lumberjack.body.onFloor()) {
      lumberjack.anims.play("running", true);
    }
    lumberjack.setFlipX(false);
  } else if (cursors.left.isDown) {
    lumberjack.setVelocityX(-200);
    if (lumberjack.body.onFloor()) {
      lumberjack.anims.play("running", true);
    }
    lumberjack.setFlipX(true);
  } else {
    lumberjack.setVelocityX(0);
    if (isOnFloor) {
      lumberjack.anims.play("standing", true);
    }
  }
  if (
    (spaceBar.isDown && lumberjack.body.onFloor()) ||
    (cursors.up.isDown && lumberjack.body.onFloor())
  ) {
    lumberjack.setVelocityY(-330);
    lumberjack.anims.play("jumping");
  }
}
