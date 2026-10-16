const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '../src/data/sitges-programme.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(rawData);

const equipTecnicMap = {
  miasma: {
    guio: "Jane Schoenbrun",
    fotografia: "Eric K. Yue",
    muntatge: "Graham Mason",
    repartiment: "Hannah Einbinder, Gillian Anderson, Jack Haven"
  },
  half: {
    guio: "Praveen Viswanath, Samjad",
    fotografia: "Pappinu",
    muntatge: "Mahesh Bhuvanend",
    repartiment: "Ranjith Sajeev, Aiswarya Raj, Abbas"
  },
  leviticus: {
    guio: "Adrian Chiarella",
    fotografia: "Tyson Perkins",
    muntatge: "Nick Fenton",
    repartiment: "Stacy Clausen, Joe Bird, Tyallah Bullock"
  },
  karma: {
    guio: "Guillaume Canet, Simon Jacquet",
    fotografia: "Benoît Debie",
    muntatge: "Laure Gardette",
    repartiment: "Marion Cotillard, Leonardo Sbaraglia, Denis Ménochet"
  },
  apocalipsis: {
    guio: "Ángel Agudo",
    fotografia: "Elías M. Félix",
    muntatge: "Luis de la Madrid, Guillermo Lorenzana Toms",
    repartiment: "Carlos Alcaide, Julia Martínez, José María Yazpik"
  },
  red: {
    guio: "Ilja Rautsi",
    fotografia: "Kerttu Hakkerainen",
    muntatge: "Eric Bäckström",
    repartiment: "Hannu-Pekka Björkman, Anni Iikkanen, Kari Hietalahti"
  },
  brain: {
    guio: "Peter Jackson, Fran Walsh, Stephen Sinclair",
    fotografia: "Pendent de confirmar",
    muntatge: "Pendent de confirmar",
    repartiment: "Timothy Balme, Diana Peñalver, Elizabeth Moody"
  },
  tesis: {
    guio: "Alejandro Amenábar, Mateo Gil",
    fotografia: "Hans Burmann",
    muntatge: "María Elena Sáinz de Rozas",
    repartiment: "Ana Torrent, Fele Martínez, Eduardo Noriega"
  },
  oceano: {
    guio: "Konstantina Kotzamani",
    fotografia: "Raphaël Vandenbussche",
    muntatge: "Livia Neroutsopoulou, Vincent Tricon, Julie Wuillai",
    repartiment: "Arisa Sasaki, Melina Mardini, Hanna Muro"
  },
  devils: {
    guio: "Ken Russell",
    fotografia: "David Watkin",
    muntatge: "Michael Bradsell",
    repartiment: "Vanessa Redgrave, Oliver Reed, Max Adrian"
  },
  "11": {
    guio: "Clara Esteban, Pau Pujol, Andrea Martínez",
    fotografia: "Mariano Suárez",
    muntatge: "Dídac Palou",
    repartiment: "Mia Sala-Patau, Pablo Scapigliati, Jael Borràs, Matías Zocca"
  },
  face: {
    guio: "Anna Biller",
    fotografia: "M. David Mullen",
    muntatge: "Anna Biller",
    repartiment: "Jonah Hauer-King, Kristine Froseth, Ellie Bamber"
  },
  girl: {
    guio: "Luka Marčetić",
    fotografia: "Lev Predan Kowarski",
    muntatge: "Špela Murenc Škulj",
    repartiment: "Urban Kuntarič, Lara Wolf"
  },
  sanguine: {
    guio: "Marion Le Corroller, Thomas Pujol",
    fotografia: "Guillaume Schiffman",
    muntatge: "Jerome Eltabet",
    repartiment: "Mara Taquin, Karin Viard, Kim Higelin"
  },
  buddy: {
    guio: "Casper Kelly, Jamie King",
    fotografia: "Zach Kuperstein",
    muntatge: "Josh Ethier",
    repartiment: "Cristin Milioti, Delaney Quinn, Keegan-Michael Key"
  },
  wicked: {
    guio: "Rasmus Birch",
    fotografia: "Jacob Møller",
    muntatge: "Mark Bukdahl",
    repartiment: "Egor Venned, Pilou Asbæk, Sofia Nolsøe"
  },
  "after-dark": {
    guio: "Dave Boyle",
    fotografia: "Patrick Ouziel",
    muntatge: "Chieko Suzaki",
    repartiment: "Moeka Hoshi, Kurumi Inagaki, Kento Kaku"
  },
  spiral: {
    guio: "Paolo Strippoli, Salvatore de Chirico",
    fotografia: "Cristiano Di Nicola",
    muntatge: "Federico Palmerini",
    repartiment: "Jasmine Trinca, Romana Maggiora Vergano, Adriano Giannini"
  },
  "no-way": {
    guio: "Romain Protat, Mohamed Chabane, Théo Jourdain",
    fotografia: "Raphaël Vandenbussche",
    muntatge: "Maxime Pozzi-Garcia",
    repartiment: "Alassane Diong, Manon Bresch, Bilel Chegrani"
  },
  salmokji: {
    guio: "Sang-min Lee",
    fotografia: "Sung-an Kim",
    muntatge: "Gang-hee Lee",
    repartiment: "Hye-yoon Kim, Jong-won Lee"
  },
  drag: {
    guio: "Greg Yagolnitzer, Raviv Ullman",
    fotografia: "Ben Goodman",
    muntatge: "Malinda Zehner",
    repartiment: "Lizzy Caplan, Lucy DeVito, John Stamos"
  },
  victorian: {
    guio: "Virginia Feito",
    fotografia: "Nico Aguilar",
    muntatge: "Dustin Chow, Lance Edmands",
    repartiment: "Maika Monroe, Thomasin McKenzie, Ruth Wilson"
  },
  hope: {
    guio: "Na Hong-jin",
    fotografia: "Hong Kyung-pyo",
    muntatge: "Kim Sun-min",
    repartiment: "Hwang Jung-min, Zo In-sung, Hoyeon (la pel·lícula també compta amb Michael Fassbender i Alicia Vikander)"
  }
};

let updatedCount = 0;
data.films = data.films.map((film) => {
  if (equipTecnicMap[film.id]) {
    updatedCount++;
    return {
      ...film,
      ...equipTecnicMap[film.id]
    };
  }
  return film;
});

console.log(`Updated ${updatedCount} films.`);
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Successfully written to sitges-programme.json');
