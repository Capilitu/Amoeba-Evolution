export default class InfoPanel {
  constructor(scene) {
    this.scene = scene;
    this.isVisible = false;
  }

  showEvolutionInfo(evolutionType) {
    if (this.isVisible) return;

    const info = this.scene.evolutionManager.getEvolutionInfo(evolutionType);
    this.isVisible = true;

    const overlay = this.scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.7).setInteractive();

    const panel = this.scene.add.image(512, 384, 'infoCard').setScale(0.6).setAlpha(0);
    const title = this.scene.add.text(512, 280, info.title, {
      fontSize: '28px',
      fontWeight: 'bold',
      fill: '#2c3e50'
    }).setOrigin(0.5).setAlpha(0);

    const description = this.scene.add.text(512, 360, info.description, {
      fontSize: '16px',
      fill: '#34495e',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5).setAlpha(0);

    const fact = this.scene.add.text(512, 440, '💡 ' + info.scientificFact, {
      fontSize: '14px',
      fill: '#27ae60',
      fontStyle: 'italic',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5).setAlpha(0);

    const button = this.scene.add.text(512, 510, 'CONTINUAR', {
      fontSize: '20px',
      fill: '#ffffff',
      backgroundColor: '#3498db',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0);

    button.on('pointerdown', () => this.hide(panel, title, description, fact, button, overlay));
    button.on('pointerover', () => button.setStyle({ fill: '#2980b9' }));
    button.on('pointerout', () => button.setStyle({ fill: '#ffffff' }));

    this.scene.tweens.add({
      targets: [panel, title, description, fact, button],
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      stagger: 100
    });

    this.overlay = overlay;
    this.elements = [panel, title, description, fact, button];
  }

  hide(...objs) {
    this.scene.tweens.add({
      targets: objs,
      alpha: 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        objs.forEach(obj => obj.destroy());
        this.overlay?.destroy();
        this.isVisible = false;
      }
    });
  }
}
