import Phaser from 'phaser';

export default class Amoeba extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    const textureKey =
      type === 'basic'
        ? 'amoebaBasic'
        : type === 'intermediate'
        ? 'amoebaIntermediate'
        : 'amoebaEvolved';

    super(scene, x, y, textureKey);

    this.scene = scene;
    this.evolutionLevel = type === 'basic' ? 1 : type === 'intermediate' ? 2 : 3;
    this.isBeingDragged = false;

    this.setScale(0.12);
    this.originalScale = 0.12;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({ draggable: true });

    this.floatSpeed = Phaser.Math.FloatBetween(0.5, 1.5);
    this.floatRadius = Phaser.Math.Between(20, 40);
    this.baseX = x;
    this.baseY = y;
    this.floatTime = 0;

    this.alpha = 0;
    this.setScale(0);
    scene.tweens.add({
      targets: this,
      alpha: 1,
      scaleX: this.originalScale,
      scaleY: this.originalScale,
      duration: 600,
      ease: 'Back.out',
      delay: Phaser.Math.Between(0, 500)
    });

    this.postFX?.addGlow?.(0x00ff88, 2, 0, false, 0.1, 5);
  }

  update() {
    if (!this.isBeingDragged) {
      this.floatTime += 0.02;

      const offsetX = Math.sin(this.floatTime * this.floatSpeed) * (this.floatRadius * 0.5);
      const offsetY = Math.cos(this.floatTime * this.floatSpeed * 0.8) * (this.floatRadius * 0.3);

      this.x = this.baseX + offsetX;
      this.y = this.baseY + offsetY;

      this.rotation = Math.sin(this.floatTime * 0.5) * 0.1;
    }
  }

  startDrag() {
    this.isBeingDragged = true;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  endDrag() {
    this.isBeingDragged = false;
    this.baseX = this.x;
    this.baseY = this.y;
  }
}
