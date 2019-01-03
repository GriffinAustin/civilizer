// Resources
var food = 0;

// Buildings
var farms = 0;

function addFood(x) {
  food += x;
  document.getElementById("food").innerHTML = "Food: " + food;
}

function buildFarm() {
  var farmCost = Math.floor(10 * Math.pow(1.1, farms));
  if(food >= farmCost){
    farms++;
    food -= farmCost;
    document.getElementById("farms").innerHTML = farms;
    document.getElementById("food").innerHTML = "Food: " + food;
    document.getElementById("foodPerSec").innerHTML = " (" + farms + " per second)";
  }
  var nextCost = Math.floor(10 * Math.pow(1.1, farms));
  document.getElementById("farmCost").innerHTML = nextCost;
}

// Game loop (1000ms per loop)
window.setInterval(function() {
  addFood(farms);
}, 1000);

function save() {
  var save = {
    food: food,
    farms: farms
  }
  localStorage.setItem("save", JSON.stringify(save));
  console.log("Game saved.");
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.food !== "undefined") food = savegame.food;
  if (typeof savegame.farms !== "undefined") farms = savegame.farms;
  console.log("Game loaded.");
}

function deleteSave() {
  localStorage.removeItem("save");
  console.log("Save deleted.");
}
