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
      "name": "barrack",
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
  // Loop through all items in "cost" of item building
  for (var i = 0; i < Object.keys(xItem.building.cost).length; i++) {
    var curResource = Object.keys(xItem.building.cost)[i];
    if (canBuild) {
      // Check if user has enough of current item
      if (item[curResource].resource.count >= xItem.building.cost[curResource]) {
        canBuild = true;
      } else {
        canBuild = false;
      }
    }
  }
  if (canBuild) {
    // Build building
    xItem.building.count++;
    // Update HTML
    document.getElementById(xItem.building.name + "s").innerHTML = xItem.building.count;
    // Loop through "cost" of item building to increase price for future
    for (var i = 0; i < Object.keys(xItem.building.cost).length; i++) {
      var curResource = Object.keys(xItem.building.cost)[i];
      var curResourceCost = xItem.building.cost[curResource];
      item[curResource].resource.count -= curResourceCost;

      var newCost = Math.floor(curResourceCost * COST_MULT);
      xItem.building.cost[curResource] = newCost;

      // Update HTML
      document.getElementById(curResource).innerHTML = curResource.capitalize() + ": " + item[curResource].resource.count;
      updateCost(xItem);
    }
  }
}

function updateCost(xItem) {
  document.getElementById(xItem.building.name + "Cost").innerHTML = "";
  for (var i = 0; i < Object.keys(xItem.building.cost).length; i++) {
    var curCost = Object.keys(xItem.building.cost)[i];
    var costVal = xItem.building.cost[curCost];
    document.getElementById(xItem.building.name + "Cost").innerHTML += curCost.capitalize() + ": " + costVal + "<br>";
  }
}

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

// Game loop (1000ms per loop)
window.setInterval(function() {
  // Add items
  for (var i = 0; i < Object.keys(item).length; i++) {
    cur = Object.keys(item)[i];
    addItem(item[cur], item[cur].building.count);
  }
}, 1000);

function init() {
  for (var i = 0; i < Object.keys(item).length; i++) {
    var curResource = Object.keys(item)[i];
    updateCost(item[curResource]);
  }

  console.log("\nInitialized\n");

}

window.onload = init;

class Cheat {

  build(xItem, count) {
    // Build building
    xItem.building.count += count;
    // Update HTML
    document.getElementById(xItem.building.name + "s").innerHTML = xItem.building.count;
  }

}
