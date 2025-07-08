import Phaser from 'phaser';
import Amoeba from './amoeba.js';
import EvolutionManager from './evolutionManager.js';
import InfoPanel from './infoPanel.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.amoebas = [];
    this.draggedAmoeba = null;
    this.evolutionManager = new EvolutionManager(this);
    this.infoPanel = new InfoPanel(this);
  }

  preload() {
    this.load.image('petriDish', 'https://play.rosebud.ai/assets/petriDishBG.png?UkPG');
    this.load.image('amoebaBasic', 'https://play.rosebud.ai/assets/amoebaBasic.png?Q2Oj');
    this.load.image('amoebaIntermediate', 'https://play.rosebud.ai/assets/amoebaIntermediate.png?Ffr9');
    this.load.image('amoebaEvolved', 'https://play.rosebud.ai/assets/amoebaEvolved.png?NNtf');
    this.load.image('infoCard', 'https://play.rosebud.ai/assets/infoCard.png?TLqF');
  }

  create() {
    this.add.image(512, 384, 'petriDish').setScale(0.75);

    this.add.text(512, 50, 'EVOLUÇÃO DAS AMEBAS', {
      fontSize: '32px',
      fontWeight: 'bold',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(512, 85, 'Arraste uma ameba até outra para evoluir!', {
      fontSize: '18px',
      fill: 'black'
    }).setOrigin(0.5);

    this.createInitialAmoebas();
    this.time.addEvent({
      delay: 5000, // 5 segundos
      callback: this.spawnRandomAmoeba,
      callbackScope: this,
      loop: true
    });

    this.input.on('dragstart', (pointer, gameObject) => {
      this.draggedAmoeba = gameObject;
      gameObject.setTint(0x00ff00);
      this.tweens.add({
        targets: gameObject,
        scaleX: gameObject.scaleX * 1.1,
        scaleY: gameObject.scaleY * 1.1,
        duration: 200,
        ease: 'Back.out'
      });
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.clearTint();
      this.tweens.add({
        targets: gameObject,
        scaleX: gameObject.originalScale,
        scaleY: gameObject.originalScale,
        duration: 200,
        ease: 'Back.out'
      });
      this.checkForMerge(gameObject);
      this.draggedAmoeba = null;
    });
  }

  createInitialAmoebas() {
    const positions = [
      { x: 300, y: 300 },
      { x: 500, y: 250 },
      { x: 700, y: 320 },
      { x: 400, y: 450 },
      { x: 600, y: 500 }
    ];

    positions.forEach(pos => {
      const amoeba = new Amoeba(this, pos.x, pos.y, 'basic');
      this.amoebas.push(amoeba);
    });
    
  }
  spawnRandomAmoeba() {
    const x = Phaser.Math.Between(300, 700);  // dentro da tela 1024x768
    const y = Phaser.Math.Between(600, 200);

    const amoeba = new Amoeba(this, x, y, 'basic');
  
    this.add.existing(amoeba);
    this.input.setDraggable(amoeba);
    this.amoebas.push(amoeba);
  }


  checkForMerge(draggedAmoeba) {
    for (let amoeba of this.amoebas) {
      if (
        amoeba !== draggedAmoeba &&
        Phaser.Geom.Intersects.RectangleToRectangle(
          draggedAmoeba.getBounds(),
          amoeba.getBounds()
        )
      ) {
        if (this.evolutionManager.canMerge(draggedAmoeba, amoeba)) {
          this.performMerge(draggedAmoeba, amoeba);
          break;
        }
      }
    }
  }

  performMerge(amoeba1, amoeba2) {
    const mergeX = (amoeba1.x + amoeba2.x) / 2;
    const mergeY = (amoeba1.y + amoeba2.y) / 2;

    this.createMergeEffect(mergeX, mergeY);

    this.removeAmoeba(amoeba1);
    this.removeAmoeba(amoeba2);

    const newType = this.evolutionManager.getEvolutionResult(amoeba1.evolutionLevel);
    const newAmoeba = new Amoeba(this, mergeX, mergeY, newType);
    this.amoebas.push(newAmoeba);

    this.infoPanel.showEvolutionInfo(newType);
  }

  createMergeEffect(x, y) {
    const particles = [];
    for (let i = 0; i < 10; i++) {
      const particle = this.add.circle(x, y, 3, 0x00ff88);
      particles.push(particle);
      this.tweens.add({
        targets: particle,
        x: x + Phaser.Math.Between(-50, 50),
        y: y + Phaser.Math.Between(-50, 50),
        alpha: 0,
        duration: 500,
        ease: 'Power2',
        onComplete: () => particle.destroy()
      });
    }

    this.cameras.main.shake(200, 0.01);
  }

  removeAmoeba(amoeba) {
    const index = this.amoebas.indexOf(amoeba);
    if (index > -1) {
      this.amoebas.splice(index, 1);
    }
    amoeba.destroy();
  }

  update() {
    

    
    if (this.draggedAmoeba && this.input.activePointer.isDown) {
      const pointer = this.input.activePointer;
      const speed = 0;

      const dx = pointer.x - this.draggedAmoeba.x;
      const dy = pointer.y - this.draggedAmoeba.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 1) {
        this.draggedAmoeba.x += (dx / distance) * speed;
        this.draggedAmoeba.y += (dy / distance) * speed;
      }
    
  }
  }
}



