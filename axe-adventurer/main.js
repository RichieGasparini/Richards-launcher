const config = {
  type: Phaser.AUTO,
  width: 576,
  height: 324,
  parent: "mygame",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.cursors;
  this.load.image("swamp-tiles", "assets/world/world-tiles/Tileset.png");
  this.load.tilemapTiledJSON("map", "assets/world/world-tiles/tiles.json");
  this.load.image("background", "assets/world/Background.png");
}

function create() {
  //create cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();

  //add background image
  const backgroundImage = this.add.image(
    config.width / 2,
    config.height / 2,
    "background"
  );

  //create world
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("swamp", "swamp-tiles");
  const worldLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
}

function update() {}
