window.onload = function () {

    var mymap = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://api.mapbox.com/styles/v1/nainakapil/cjj2qpm2e2p672sobazzcf0dz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFpbmFrYXBpbCIsImEiOiJjamoxN3FvZHgwbDB4M2tud3RlN2o3dGhiIn0.HdZy3o_hp7PerOE8Op1dDw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        minZoom: 3,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
    //moving icon set as starfish
    var Icon = L.icon({
        iconUrl: 'assets/img/fish.png',


        iconSize: [50, 50], 

        iconAnchor: [25, 25], 
    });
     
    //marker set as blue light image
    var lightIcon = L.icon({
        iconUrl: 'assets/img/marker.png',


        iconSize: [120, 60], 

        iconAnchor: [60, 30], 
    });
    var marker;
    // var marker = L.marker([30.5532, 79.452]).addTo(mymap);
    // marker.bindPopup("Gaumukh").openPopup();

    //setInterval function is used for doing something again & again after an interval of time
    var marker1 = 
    setInterval(function(){ 
    var myMovingMarker = L.Marker.movingMarker(

        latLngs, [500,1000,1000,1000,1000,1000,1000] , {icon: Icon, loop: false}).addTo(mymap);

    //at the end starfish is disappeared using end and removeFrom 
    myMovingMarker.on('end', function() {
        {myMovingMarker.removeFrom(mymap)}
    });
    //...
    myMovingMarker.start();}, 750);

    

    var river = L.river(latLngs, {
    minWidth: 5,  // px
    maxWidth: 5  // px
    }).addTo(mymap);

    //for loop for showing markers at coordinates mentioned in dataSet
    for (data in dataSet){
        
       var dataMarker = L.marker(dataSet[data].coord,{icon:lightIcon}).addTo(mymap);
       dataMarker.bindPopup(dataSet[data].waterLevel.toString()+" "+dataSet[data].waterFlow.toString());
       dataMarker.on('mouseover', function (e) {
        this.openPopup();
       });
       dataMarker.on('mouseout', function (e) {
        this.closePopup();
       });
    //    dataMarker.bindPopup(dataSet[data].waterLevel.toString()+" "+dataSet[data].waterFlow.toString()).openPopup();
    // dataMarker.bindPopup(dataSet[data].waterFlow.toString()).openPopup();
    }


};
var latLngs = [[30.1459, 78.5993],
    [30.0869, 78.2676],
    [29.9457, 78.1642],
    [26.4499, 80.3319],
    [25.4358, 81.8463],
    [25.3176, 82.9739],
    [25.5941, 85.1376],
    [22.5726, 88.3639]];

    //Array of JSON objects
    var dataSet = [
    {"coord":[30.1459, 78.5993],"waterLevel" :50,"waterFlow":12,"waterQuality" :2 },
    {"coord":[30.0869, 78.2676],"waterLevel" :60,"waterFlow":18,"waterQuality" :1},
    {"coord":[29.9457, 78.1642],"waterLevel" :40,"waterFlow":8,"waterQuality" :0},
    {"coord":[26.4499, 80.3319],"waterLevel" :30,"waterFlow":22,"waterQuality" :1},
    {"coord":[25.4358, 81.8463],"waterLevel" :10,"waterFlow":20,"waterQuality" :3},
    {"coord":[25.3176, 82.9739],"waterLevel" :18,"waterFlow":70,"waterQuality" :2},
    {"coord":[25.5941, 85.1376],"waterLevel" :8,"waterFlow":7,"waterQuality" :1},
    {"coord":[22.5726, 88.3639],"waterLevel" :18,"waterFlow":70,"waterQuality" :0},
    ];



// https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmFpbmFrYXBpbCIsImEiOiJjamoxN3FvZHgwbDB4M2tud3RlN2o3dGhiIn0.HdZy3o_hp7PerOE8Op1dDw

// satellite view
// https://api.mapbox.com/styles/v1/nainakapil/cjj2qpm2e2p672sobazzcf0dz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFpbmFrYXBpbCIsImEiOiJjamoxN3FvZHgwbDB4M2tud3RlN2o3dGhiIn0.HdZy3o_hp7PerOE8Op1dDw