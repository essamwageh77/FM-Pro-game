import { Player, PlayerPosition, Team } from "../types";

const createPlayer = (
  id: string,
  name: string,
  position: PlayerPosition,
  rating: number,
  nationality: string,
  age: number,
  eaId?: string
): Player => {
  // Price calculation: exponential based on rating
  const marketValue = Math.floor(Math.pow(rating / 50, 7) * 4000);
  
  // Use three artistic sketches as default fallbacks
  const fallbackSketches = [
    '/src/assets/images/player_sketch_1_1782806570373.jpg',
    '/src/assets/images/player_sketch_2_1782806586098.jpg',
    '/src/assets/images/player_sketch_3_1782806599918.jpg'
  ];
  
  const faceUrl = eaId 
    ? `https://cdn.futbin.com/content/fifa24/img/players/${eaId}.png`
    : fallbackSketches[Math.floor(Math.random() * fallbackSketches.length)];
  
  return {
    id,
    name,
    age,
    nationality,
    position,
    rating,
    faceUrl,
    attributes: {
      pace: Math.min(99, Math.floor(rating * (0.8 + Math.random() * 0.4))),
      shooting: Math.min(99, Math.floor(rating * (0.7 + Math.random() * 0.4))),
      passing: Math.min(99, Math.floor(rating * (0.7 + Math.random() * 0.4))),
      dribbling: Math.min(99, Math.floor(rating * (0.7 + Math.random() * 0.4))),
      defending: Math.min(99, Math.floor(rating * (0.6 + Math.random() * 0.4))),
      physical: Math.min(99, Math.floor(rating * (0.7 + Math.random() * 0.4))),
      stamina: Math.min(99, Math.floor(rating * (0.8 + Math.random() * 0.2))),
      potential: Math.min(99, rating + Math.floor(Math.random() * 5)),
    },
    marketValue,
    salary: Math.floor(rating * 150),
    contractYears: 2 + Math.floor(Math.random() * 3),
    teamId: null,
    isYouth: false,
    history: []
  };
};

export const generateRealPlayers = (): Player[] => {
  const players: Player[] = [];

  // GK (10)
  const gks = [
    { name: "Thibaut Courtois", rating: 90, nat: "Belgium", age: 32, eaId: "192119" },
    { name: "Alisson Becker", rating: 89, nat: "Brazil", age: 31, eaId: "212831" },
    { name: "Marc-André ter Stegen", rating: 89, nat: "Germany", age: 32, eaId: "192448" },
    { name: "Ederson", rating: 89, nat: "Brazil", age: 30, eaId: "210257" },
    { name: "Jan Oblak", rating: 88, nat: "Slovenia", age: 31, eaId: "200389" },
    { name: "Mike Maignan", rating: 87, nat: "France", age: 28, eaId: "215698" },
    { name: "Gianluigi Donnarumma", rating: 87, nat: "Italy", age: 25, eaId: "230621" },
    { name: "Gregor Kobel", rating: 87, nat: "Switzerland", age: 26, eaId: "233150" },
    { name: "Manuel Neuer", rating: 87, nat: "Germany", age: 38, eaId: "167495" },
    { name: "Emiliano Martínez", rating: 85, nat: "Argentina", age: 31, eaId: "202357" },
  ];
  gks.forEach((p, i) => players.push(createPlayer(`gk-${i}`, p.name, PlayerPosition.GK, p.rating, p.nat, p.age, p.eaId)));

  // CB (10)
  const cbs = [
    { name: "Virgil van Dijk", rating: 89, nat: "Netherlands", age: 32, eaId: "203376" },
    { name: "Rúben Dias", rating: 89, nat: "Portugal", age: 27, eaId: "239701" },
    { name: "William Saliba", rating: 87, nat: "France", age: 23, eaId: "243580" },
    { name: "Alessandro Bastoni", rating: 87, nat: "Italy", age: 25, eaId: "237692" },
    { name: "Marquinhos", rating: 87, nat: "Brazil", age: 30, eaId: "211434" },
    { name: "Antonio Rüdiger", rating: 87, nat: "Germany", age: 31, eaId: "205452" },
    { name: "Ronald Araújo", rating: 86, nat: "Uruguay", age: 25, eaId: "246045" },
    { name: "Gabriel Magalhães", rating: 86, nat: "Brazil", age: 26, eaId: "235410" },
    { name: "Bremer", rating: 86, nat: "Brazil", age: 27, eaId: "241810" },
    { name: "John Stones", rating: 85, nat: "England", age: 30, eaId: "203574" },
  ];
  cbs.forEach((p, i) => players.push(createPlayer(`cb-${i}`, p.name, PlayerPosition.CB, p.rating, p.nat, p.age, p.eaId)));

  // LB (10)
  const lbs = [
    { name: "Theo Hernández", rating: 87, nat: "France", age: 26, eaId: "232656" },
    { name: "Andrew Robertson", rating: 86, nat: "Scotland", age: 30, eaId: "216267" },
    { name: "Alejandro Grimaldo", rating: 86, nat: "Spain", age: 28, eaId: "212678" },
    { name: "Alphonso Davies", rating: 83, nat: "Canada", age: 23, eaId: "234045" },
    { name: "Ferland Mendy", rating: 82, nat: "France", age: 29, eaId: "235883" },
    { name: "Federico Dimarco", rating: 84, nat: "Italy", age: 26, eaId: "228511" },
    { name: "Nuno Mendes", rating: 83, nat: "Portugal", age: 22, eaId: "256630" },
    { name: "Destiny Udogie", rating: 82, nat: "Italy", age: 21, eaId: "258907" },
    { name: "Luke Shaw", rating: 82, nat: "England", age: 28, eaId: "205988" },
    { name: "Pervis Estupiñán", rating: 82, nat: "Ecuador", age: 26, eaId: "240212" },
  ];
  lbs.forEach((p, i) => players.push(createPlayer(`lb-${i}`, p.name, PlayerPosition.LB, p.rating, p.nat, p.age, p.eaId)));

  // RB (10)
  const rbs = [
    { name: "Dani Carvajal", rating: 86, nat: "Spain", age: 32, eaId: "204963" },
    { name: "Trent Alexander-Arnold", rating: 86, nat: "England", age: 25, eaId: "231281" },
    { name: "Jules Koundé", rating: 85, nat: "France", age: 25, eaId: "241484" },
    { name: "Kyle Walker", rating: 84, nat: "England", age: 34, eaId: "188377" },
    { name: "Jeremie Frimpong", rating: 84, nat: "Netherlands", age: 23, eaId: "252537" },
    { name: "Achraf Hakimi", rating: 84, nat: "Morocco", age: 25, eaId: "235212" },
    { name: "Reece James", rating: 84, nat: "England", age: 24, eaId: "238711" },
    { name: "Kieran Trippier", rating: 84, nat: "England", age: 33, eaId: "186153" },
    { name: "Ben White", rating: 82, nat: "England", age: 26, eaId: "237160" },
    { name: "Denzel Dumfries", rating: 82, nat: "Netherlands", age: 28, eaId: "234577" },
  ];
  rbs.forEach((p, i) => players.push(createPlayer(`rb-${i}`, p.name, PlayerPosition.RB, p.rating, p.nat, p.age, p.eaId)));

  // DMF (10)
  const dmfs = [
    { name: "Rodri", rating: 91, nat: "Spain", age: 28, eaId: "231866" },
    { name: "Declan Rice", rating: 87, nat: "England", age: 25, eaId: "234396" },
    { name: "João Palhinha", rating: 85, nat: "Portugal", age: 28, eaId: "231610" },
    { name: "Aurélien Tchouaméni", rating: 85, nat: "France", age: 24, eaId: "247411" },
    { name: "Bruno Guimarães", rating: 85, nat: "Brazil", age: 26, eaId: "245367" },
    { name: "Douglas Luiz", rating: 85, nat: "Brazil", age: 26, eaId: "235806" },
    { name: "Casemiro", rating: 84, nat: "Brazil", age: 32, eaId: "200145" },
    { name: "Martín Zubimendi", rating: 84, nat: "Spain", age: 25, eaId: "244917" },
    { name: "Sandro Tonali", rating: 84, nat: "Italy", age: 24, eaId: "241096" },
    { name: "Eduardo Camavinga", rating: 83, nat: "France", age: 21, eaId: "248243" },
  ];
  dmfs.forEach((p, i) => players.push(createPlayer(`dmf-${i}`, p.name, PlayerPosition.DMF, p.rating, p.nat, p.age, p.eaId)));

  // CMD (10)
  const cmds = [
    { name: "Kevin De Bruyne", rating: 91, nat: "Belgium", age: 33, eaId: "192985" },
    { name: "Jude Bellingham", rating: 90, nat: "England", age: 20, eaId: "252371" },
    { name: "Martin Ødegaard", rating: 89, nat: "Norway", age: 25, eaId: "222492" },
    { name: "Federico Valverde", rating: 88, nat: "Uruguay", age: 25, eaId: "239053" },
    { name: "Nicolò Barella", rating: 87, nat: "Italy", age: 27, eaId: "231677" },
    { name: "Jamal Musiala", rating: 87, nat: "Germany", age: 21, eaId: "256790" },
    { name: "Pedri", rating: 86, nat: "Spain", age: 21, eaId: "251854" },
    { name: "Luka Modrić", rating: 86, nat: "Croatia", age: 38, eaId: "177003" },
    { name: "İlkay Gündoğan", rating: 86, nat: "Germany", age: 33, eaId: "186942" },
    { name: "Gavi", rating: 83, nat: "Spain", age: 19, eaId: "264240" },
  ];
  cmds.forEach((p, i) => players.push(createPlayer(`cmd-${i}`, p.name, PlayerPosition.CMD, p.rating, p.nat, p.age, p.eaId)));

  // AMF (10)
  const amfs = [
    { name: "Phil Foden", rating: 90, nat: "England", age: 24, eaId: "237691" },
    { name: "Florian Wirtz", rating: 88, nat: "Germany", age: 21, eaId: "256631" },
    { name: "Bernardo Silva", rating: 88, nat: "Portugal", age: 29, eaId: "218667" },
    { name: "Antoine Griezmann", rating: 88, nat: "France", age: 33, eaId: "194765" },
    { name: "Bruno Fernandes", rating: 87, nat: "Portugal", age: 29, eaId: "212198" },
    { name: "Paulo Dybala", rating: 86, nat: "Argentina", age: 30, eaId: "211110" },
    { name: "Cole Palmer", rating: 85, nat: "England", age: 22, eaId: "255475" },
    { name: "James Maddison", rating: 84, nat: "England", age: 27, eaId: "223058" },
    { name: "Dominik Szoboszlai", rating: 83, nat: "Hungary", age: 23, eaId: "242037" },
    { name: "Xavi Simons", rating: 83, nat: "Netherlands", age: 21, eaId: "258729" },
  ];
  amfs.forEach((p, i) => players.push(createPlayer(`amf-${i}`, p.name, PlayerPosition.AMF, p.rating, p.nat, p.age, p.eaId)));

  // SS (10)
  const sss = [
    { name: "Christopher Nkunku", rating: 84, nat: "France", age: 26, eaId: "232411" },
    { name: "Julián Álvarez", rating: 84, nat: "Argentina", age: 24, eaId: "253283" },
    { name: "Randal Kolo Muani", rating: 84, nat: "France", age: 25, eaId: "243615" },
    { name: "Kai Havertz", rating: 82, nat: "Germany", age: 25, eaId: "235790" },
    { name: "Memphis Depay", rating: 82, nat: "Netherlands", age: 30, eaId: "202556" },
    { name: "Ángel Correa", rating: 82, nat: "Argentina", age: 29, eaId: "214997" },
    { name: "João Félix", rating: 81, nat: "Portugal", age: 24, eaId: "242444" },
    { name: "Giacomo Raspadori", rating: 79, nat: "Italy", age: 24, eaId: "248384" },
    { name: "Joao Pedro", rating: 78, nat: "Brazil", age: 22, eaId: "251347" },
    { name: "Gonçalo Ramos", rating: 80, nat: "Portugal", age: 23, eaId: "253457" },
  ];
  sss.forEach((p, i) => players.push(createPlayer(`ss-${i}`, p.name, PlayerPosition.SS, p.rating, p.nat, p.age, p.eaId)));

  // CF (10)
  const cfs = [
    { name: "Erling Haaland", rating: 91, nat: "Norway", age: 23, eaId: "239085" },
    { name: "Kylian Mbappé", rating: 91, nat: "France", age: 25, eaId: "231747" },
    { name: "Harry Kane", rating: 90, nat: "England", age: 30, eaId: "202126" },
    { name: "Lautaro Martínez", rating: 89, nat: "Argentina", age: 26, eaId: "231478" },
    { name: "Robert Lewandowski", rating: 88, nat: "Poland", age: 35, eaId: "188545" },
    { name: "Victor Osimhen", rating: 88, nat: "Nigeria", age: 25, eaId: "232293" },
    { name: "Karim Benzema", rating: 86, nat: "France", age: 36, eaId: "165153" },
    { name: "Ollie Watkins", rating: 85, nat: "England", age: 28, eaId: "232381" },
    { name: "Alexander Isak", rating: 84, nat: "Sweden", age: 24, eaId: "233064" },
    { name: "Alexander Sørloth", rating: 82, nat: "Norway", age: 28, eaId: "220440" },
  ];
  cfs.forEach((p, i) => players.push(createPlayer(`cf-${i}`, p.name, PlayerPosition.CF, p.rating, p.nat, p.age, p.eaId)));

  // LFD (10)
  const lfds = [
    { name: "Vinícius Júnior", rating: 90, nat: "Brazil", age: 23, eaId: "238794" },
    { name: "Heung Min Son", rating: 87, nat: "South Korea", age: 31, eaId: "200104" },
    { name: "Rafael Leão", rating: 86, nat: "Portugal", age: 25, eaId: "241721" },
    { name: "Khvicha Kvaratskhelia", rating: 85, nat: "Georgia", age: 23, eaId: "258079" },
    { name: "Kingsley Coman", rating: 85, nat: "France", age: 28, eaId: "224458" },
    { name: "Luis Díaz", rating: 84, nat: "Colombia", age: 27, eaId: "241084" },
    { name: "Gabriel Martinelli", rating: 84, nat: "Brazil", age: 23, eaId: "251566" },
    { name: "Jack Grealish", rating: 84, nat: "England", age: 28, eaId: "204485" },
    { name: "Marcus Rashford", rating: 82, nat: "England", age: 26, eaId: "231675" },
    { name: "Kaoru Mitoma", rating: 81, nat: "Japan", age: 27, eaId: "260132" },
  ];
  lfds.forEach((p, i) => players.push(createPlayer(`lfd-${i}`, p.name, PlayerPosition.LFD, p.rating, p.nat, p.age, p.eaId)));

  // RWD (10)
  const rwds = [
    { name: "Mohamed Salah", rating: 89, nat: "Egypt", age: 32, eaId: "209331" },
    { name: "Bukayo Saka", rating: 87, nat: "England", age: 22, eaId: "246781" },
    { name: "Rodrygo", rating: 86, nat: "Brazil", age: 23, eaId: "243812" },
    { name: "Ousmane Dembélé", rating: 86, nat: "France", age: 27, eaId: "231443" },
    { name: "Leroy Sané", rating: 85, nat: "Germany", age: 28, eaId: "209658" },
    { name: "Federico Chiesa", rating: 84, nat: "Italy", age: 26, eaId: "235805" },
    { name: "Jarrod Bowen", rating: 82, nat: "England", age: 27, eaId: "230347" },
    { name: "Takefusa Kubo", rating: 82, nat: "Japan", age: 23, eaId: "237681" },
    { name: "Lamine Yamal", rating: 81, nat: "Spain", age: 16, eaId: "273130" },
    { name: "Dejan Kulusevski", rating: 81, nat: "Sweden", age: 24, eaId: "247733" },
  ];
  rwds.forEach((p, i) => players.push(createPlayer(`rwd-${i}`, p.name, PlayerPosition.RWD, p.rating, p.nat, p.age, p.eaId)));


  return players;
};

export const generateInitialTeams = (): Team[] => {
  return [
    {
      id: "team-1",
      name: "My Club",
      managerId: null,
      budget: 1500000, // Increased budget to afford real stars
      stadiumCapacity: 10000,
      fansBase: 100000,
      facilitiesLevel: 1,
      youthAcademyLevel: 1,
      tactics: {
        formation: "4-3-3",
        mentality: "Balanced",
        passingStyle: "Mixed",
        pressingIntensity: 50,
      }
    }
  ];
};

