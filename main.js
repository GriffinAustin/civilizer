const COST = 10;

var resources = {
  "food": 0,
  "wood": 0,
  "stone": 0
}

var buildings = {
  "farms": 0,
  "lumberjackHuts": 0,
  "mines": 0
}

function addFood(x) {
  resources.food += x;
  document.getElementById("food").innerHTML = "Food: " + resources.food;
}

function addWood(x) {
  resources.wood += x;
  document.getElementById("wood").innerHTML = "Wood: " + resources.wood;
}

function addStone(x) {
  resources.stone += x;
  document.getElementById("stone").innerHTML = "Stone: " + resources.stone;
}

function buildFarm() {
  var farmCost = Math.floor(COST * Math.pow(1.1, buildings.farms));
  if(resources.food >= farmCost){
    buildings.farms++;
    resources.food -= farmCost;
    document.getElementById("farms").innerHTML = buildings.farms;
    document.getElementById("food").innerHTML = "Food: " + resources.food;
  }
  var nextCost = Math.floor(COST * Math.pow(1.1, buildings.farms));
  document.getElementById("farmCost").innerHTML = nextCost;
}

function buildLumberjackHut() {
  var lumberjackHutCost = Math.floor(COST * Math.pow(1.1, buildings.lumberjackHuts));
  if(resources.wood >= lumberjackHutCost){
    buildings.lumberjackHuts++;
    resources.wood -= lumberjackHutCost;
    document.getElementById("lumberjackHuts").innerHTML = buildings.lumberjackHuts;
    document.getElementById("wood").innerHTML = "Wood: " + resources.wood;
  }
  var nextCost = Math.floor(COST * Math.pow(1.1, buildings.lumberjackHuts));
  document.getElementById("lumberjackHutCost").innerHTML = nextCost;
}

function buildMine() {
  var mineCost = Math.floor(COST * Math.pow(1.1, buildings.mines));
  if(resources.stone >= mineCost){
    buildings.mines++;
    resources.stone -= mineCost;
    document.getElementById("mines").innerHTML = buildings.mines;
    document.getElementById("stone").innerHTML = "Stone: " + resources.stone;
  }
  var nextCost = Math.floor(COST * Math.pow(1.1, buildings.mines));
  document.getElementById("mineCost").innerHTML = nextCost;
}

// Game loop (1000ms per loop)
window.setInterval(function() {
  addFood(buildings.farms);
  addWood(buildings.lumberjackHuts);
  addStone(buildings.mines);
}, 1000);

function save() {
  var save = {
    resources: resources,
    buildings: buildings
  }
  localStorage.setItem("save", JSON.stringify(save));
  console.log("Game saved.");
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.resources !== "undefined") resources = savegame.resources;
  if (typeof savegame.buildings !== "undefined") buildings = savegame.buildings;
  console.log("Game loaded.");
}

function deleteSave() {
  localStorage.removeItem("save");
  console.log("Game deleted.");
}
