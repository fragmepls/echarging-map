var mymap = L.map("map").setView([44, 13], 7);
var userLat;
var userLng;
const allMarkers = L.layerGroup();
const availableMarkers = L.layerGroup();
const notAvailableMarkers = L.layerGroup();
const capacityMarkers1 = L.layerGroup();
const capacityMarkers2 = L.layerGroup();
const capacityMarkers3 = L.layerGroup();
const capacityMarkers4 = L.layerGroup();

var zoomControl = L.control.zoom();
zoomControl.setPosition("bottomright");
zoomControl.addTo(mymap);

mymap.removeControl(mymap.zoomControl);

navigator.geolocation.getCurrentPosition(function (position) {
  userLat = position.coords.latitude;
  userLng = position.coords.longitude;
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

var control = L.Routing.control({
  waypoints: [L.latLng(userLat, userLng)],
  zoomControl: false,
  routeWhileDragging: true,
  addWaypoints: true,
  dragWaypoints: true,
  altLineOptions: true,
  showInstructions: true,
  show: true,
  collapsible: true,
  geocoder: L.Control.Geocoder.nominatim(),
}).addTo(mymap);

async function getJson() {
  try {
    const response = await fetch("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation/*");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function setAllMarkers() {
  jsonObj = await getJson();
  Object.values(jsonObj["data"]).forEach((value) => {
    var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(allMarkers);
    marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"] + "<br>" + "<a href='#' class='marker'>Route</a>");
    marker.on("popupopen", function () {
      document.querySelector(".marker").addEventListener("click", function () {
        var destinationLatLng = marker.getLatLng();
        control.setWaypoints([L.latLng(userLat, userLng), destinationLatLng]);
        console.log(userLat);
        console.log(userLng);
      });
    });
  });
  allMarkers.addTo(mymap);
}

async function setAvailableMarkers() {
  jsonObj = await getJson();
  Object.values(jsonObj["data"]).forEach((value) => {
    if (value["savailable"] == true) {
      var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(availableMarkers);
      marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
    } else {
      var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(notAvailableMarkers);
      marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
    }
  });
}

async function setCapacityMarkers() {
  jsonObj = await getJson();
  Object.values(jsonObj["data"]).forEach((value) => {
    switch (+value["smetadata"]["capacity"]) {
      case 1: {
        var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(capacityMarkers1);
        marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
        break;
      }
      case 2: {
        var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(capacityMarkers2);
        marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
        break;
      }
      case 3: {
        var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(capacityMarkers3);
        marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
        break;
      }
      case 4: {
        var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(capacityMarkers4);
        marker.bindPopup("<b>" + value["smetadata"]["address"] + "</b><br>" + "Available: " + value["savailable"] + "<br>" + "Name: " + value["sname"]);
        break;
      }
    }
  });
}

setAllMarkers();
setAvailableMarkers();
setCapacityMarkers();

document.querySelector(".all-link").addEventListener("click", function () {
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers3);
  mymap.removeLayer(capacityMarkers4);
  allMarkers.addTo(mymap);
});

document.querySelector(".available").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers3);
  mymap.removeLayer(capacityMarkers4);
  availableMarkers.addTo(mymap);
});

document.querySelector(".not-available").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers3);
  mymap.removeLayer(capacityMarkers4);
  notAvailableMarkers.addTo(mymap);
});

document.querySelector(".one").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers3);
  mymap.removeLayer(capacityMarkers4);
  capacityMarkers1.addTo(mymap);
});

document.querySelector(".two").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers3);
  mymap.removeLayer(capacityMarkers4);
  capacityMarkers2.addTo(mymap);
});

document.querySelector(".three").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers4);
  capacityMarkers3.addTo(mymap);
});

document.querySelector(".four").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(availableMarkers);
  mymap.removeLayer(notAvailableMarkers);
  mymap.removeLayer(capacityMarkers1);
  mymap.removeLayer(capacityMarkers2);
  mymap.removeLayer(capacityMarkers3);
  capacityMarkers4.addTo(mymap);
});
