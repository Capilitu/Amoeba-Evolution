// library.js

// Lista de amoebas com nomes e imagens
const amoebaLibrary = [
  { 
    level: 1, 
    name: "Ameba Inicial", 
    img: "https://play.rosebud.ai/assets/amoebaBasic.png?Q2Oj",
    habitat: "Poças de água doce",
    desc: "A forma mais simples de ameba, ainda frágil mas curiosa.",
  },
  { 
    level: 2, 
    name: "Ameba Evoluída", 
    img: "https://play.rosebud.ai/assets/amoebaIntermediate.png?Ffr9",
    habitat: "Lagos rasos",
    desc: "Já aprendeu a se dividir melhor, mais resistente e ativa.",
  },
  { 
    level: 3, 
    name: "Ameba Superior", 
    img: "https://play.rosebud.ai/assets/amoebaEvolved.png?NNtf",
    habitat: "Águas paradas ricas em nutrientes",
    desc: "Ganha formas mais complexas e maior inteligência primitiva.",
  },
  { 
    level: 4, 
    name: "Ameba Mestre", 
    img: "https://rosebud.ai/assets/amoeba4.png?80Vp",
    habitat: "Ambientes extremos",
    desc: "Consegue sobreviver onde outras já teriam perecido.",
  },
  { 
    level: 5, 
    name: "Ameba Lendária", 
    img: "https://rosebud.ai/assets/amoeba5.png?KeAk",
    habitat: "Locais misteriosos",
    desc: "Tão rara que poucos cientistas acreditam em sua existência.",
  }
];

// 🔹 Carrega as amoebas desbloqueadas do jogo
let amoebasUnlocked = JSON.parse(localStorage.getItem("discoveredAmoebas")) || [];
amoebasUnlocked = [...new Set(amoebasUnlocked)].sort((a,b) => a-b);

// 🔹 Carrega informações detalhadas (datas etc.)
const discoveries = JSON.parse(localStorage.getItem("amoebaDiscoveries")) || {};

const libraryGrid = document.getElementById("libraryGrid");

// Renderizar biblioteca
amoebaLibrary.forEach(amoeba => {
  const card = document.createElement("div");
  card.className = "amoeba-card";

  if (amoebasUnlocked.includes(amoeba.level)) {
    // Pegamos a data salva no main.js ou "Desconhecida"
    const date = discoveries[amoeba.level]?.date || "Desconhecida";
    card.innerHTML = `
      <img src="${amoeba.img}" alt="${amoeba.name}" class="amoeba-img">
      <h3>${amoeba.name}</h3>
      <p><b>Nível:</b> ${amoeba.level}</p>
      <p><b>Habitat:</b> ${amoeba.habitat}</p>
      <p><b>Descoberta em:</b> ${date}</p>
      <p>${amoeba.desc}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="locked">???</div>
      <h3>Desconhecida</h3>
      <p>Nível ${amoeba.level}</p>
    `;
  }

  libraryGrid.appendChild(card);
});
