const BASE_COST = 10;
const COST_MULT = 1.2;

var item = {
  "food": {
    "name": "food",
    "resource": {
      "type": "material",
      "count": 0
    },
    "building": {
      "name": "farm",
      "count": 0,
      "cost": {
        "wood": 10,
        "stone": 5
      }
    }
  },
  "wood": {
    "name": "wood",
    "resource": {
      "type": "material",
      "count": 0
    },
    "building": {
      "name": "lumberjackHut",
      "count": 0,
      "cost": {
        "wood": 5,
        "stone": 10
      }
    }
  },
  "stone": {
    "name": "stone",
    "resource": {
      "type": "material",
      "count": 0
    },
    "building": {
      "name": "mine",
      "count": 0,
      "cost": {
        "wood": 15
      }
    }
  },
  "soldier": {
    "name": "soldier",
    "resource": {
      "type": "unit",
      "count": 0
    },
    "building": {
      "name": "barracks",
      "count": 0,
      "cost": {
        "food": 200,
        "wood": 50,
        "stone": 100
      }
    }
  }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function addItem(xItem, count) {
  xItem.resource.count += count;
  document.getElementById(xItem.name).innerHTML = xItem.name.capitalize() + ": " + xItem.resource.count;
}

function build(xItem) {
  var canBuild = true;
  for (var i = 0; i < Object.keys(xItem.building.cost).length; i++) {
    var curResource = Object.keys(xItem.building.cost)[i];
    if (canBuild) {
      if (item[curResource].resource.count >= xItem.building.cost[curResource]) {
        canBuild = true;
      } else {
        canBuild = false;
      }
    }
  }
  if (canBuild) {
    xItem.building.count++;
    document.getElementById(xItem.building.name + "s").innerHTML = xItem.building.count;
    for (var i = 0; i < Object.keys(xItem.building.cost).length; i++) {
      var curResource = Object.keys(xItem.building.cost)[i];
      var curResourceCost = xItem.building.cost[curResource];
      item[curResource].resource.count -= curResourceCost;

      var newCost = Math.floor(curResourceCost * COST_MULT);
      xItem.building.cost[curResource] = newCost;

      document.getElementById(curResource).innerHTML = curResource.capitalize() + ": " + item[curResource].resource.count;
    }
  }
}

// Game loop (1000ms per loop)
window.setInterval(function() {
  addItem(item.food, item.food.building.count);
  addItem(item.wood, item.wood.building.count);
  addItem(item.stone, item.stone.building.count);
  addItem(item.soldier, item.soldier.building.count);
}, 1000);

function save() {
  var save = {
    item: item
  }
  localStorage.setItem("save", JSON.stringify(save));
  console.log("Game saved.");
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.item !== "undefined") item = savegame.item;
  console.log("Game loaded.");
}

function deleteSave() {
  localStorage.removeItem("save");
  console.log("Game deleted.");
}
