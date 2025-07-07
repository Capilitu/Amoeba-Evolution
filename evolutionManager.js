export default class EvolutionManager {
  constructor(scene) {
    this.scene = scene;
  }

  canMerge(amoeba1, amoeba2) {
    return amoeba1.evolutionLevel === amoeba2.evolutionLevel && amoeba1.evolutionLevel < 3;
  }

  getEvolutionResult(currentLevel) {
    switch (currentLevel) {
      case 1: return 'intermediate';
      case 2: return 'evolved';
      default: return 'evolved';
    }
  }

  getEvolutionInfo(type) {
    switch (type) {
      case 'intermediate':
        return {
          title: 'AMEBA INTERMEDIÁRIA',
          description: '• Divisão celular por mitose\n• Crescimento do citoplasma\n• Fagocitose eficiente\n• Pseudópodes desenvolvidos',
          scientificFact: 'Amebas se dividem por mitose criando clones da célula original.'
        };
      case 'evolved':
        return {
          title: 'AMEBA EVOLUÍDA',
          description: '• Multinucleada\n• Digestão especializada\n• Resistente a ambientes extremos\n• Forma cistos',
          scientificFact: 'Amebas gigantes podem ter até 5 cm e centenas de núcleos.'
        };
      default:
        return {
          title: 'AMEBA BÁSICA',
          description: '• Célula eucarionte\n• Movimento por pseudópodes\n• Digestão por fagocitose\n• Respiração por difusão',
          scientificFact: 'Vivem em ambientes aquáticos do mundo todo.'
        };
    }
  }
}
