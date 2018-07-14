window.onload = function () {

    var mymap = L.map('map').setView([24.6005, 80.8322], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/nainakapil/cjj2qpm2e2p672sobazzcf0dz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFpbmFrYXBpbCIsImEiOiJjamoxN3FvZHgwbDB4M2tud3RlN2o3dGhiIn0.HdZy3o_hp7PerOE8Op1dDw', {
        maxZoom: 15,
        minZoom: 3,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    // moving icon set as starfish
    var Icon = L.icon({
        iconUrl: 'assets/img/micon.png',
        iconSize: [60, 60],
        IiconAnchor: [45, 45],
    });

    // marker set as blue light image
    var lightIcon = L.icon({
        iconUrl: 'assets/img/marker.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
    var marker;

    // setInterval function is used for doing something again & again after an interval of time
    var marker1 =
        setInterval(function () {
            var myMovingMarker = L.Marker.movingMarker(

                latLngs, [500, 1000, 1000, 1000, 1000, 1000, 1000], {
                    icon: Icon,
                    loop: false
                }).addTo(mymap);

            // at the end starfish is disappeared using end and removeFrom 
            myMovingMarker.on('end', function () {
                {
                    myMovingMarker.removeFrom(mymap)
                }
            });
            //...
            myMovingMarker.start();
        }, 750);



    var river = L.river(latLngs, {
        minWidth: 5,
        maxWidth: 5
    }).addTo(mymap);

    $.getJSON('js/gangacoord.json', function (dataSet) {
        // for loop for showing markers(blue led) and popups at coordinates mentioned in dataSet
        for (data in dataSet) {

            var dataMarker = L.marker(dataSet[data].coord, {
                icon: lightIcon,
                zIndexOffset: 1000
            }).addTo(mymap);
            // we can apply html to popup content using variable popupContent
            var waterLevel = dataSet[data].waterLevel.toString();
            var waterFlow = dataSet[data].waterFlow.toString();
            var waterQuality = dataSet[data].waterQuality.toString();
            var popupContent = `
                <div class="row">
                    <div class="col-sm-4 popup-item">
                        <img src="assets/img/level.png"/> 
                        <div class="popup-text">
                            <div>Water Level</div>
                            <div>${waterLevel}</div>
                        </div>
                    </div>
                    <div class="col-sm-4 popup-item">
                        <img src="assets/img/flow.png"/> 
                        <div class="popup-text">
                            <div>Water Flow</div>
                            <div>${waterFlow}</div>
                        </div>
                    </div>
                    <div class="col-sm-4 popup-item">
                        <img src="assets/img/chemistry.png"/> 
                        <div class="popup-text">
                            <div>Water Quality</div>
                            <div>${waterQuality}</div>
                        </div>
                    </div>
                </div>
            `;

            // defined class for popup is custom-popup
            dataMarker.bindPopup(popupContent, {
                className: "custom-popup",
                minWidth: 350,
                maxWidth: 400

            });

            // popup appears on mouse hover
            dataMarker.on('mouseover', function (e) {
                this.openPopup();
            });
            // dataMarker.on('mouseout', function (e) {
            //     this.closePopup();
            // });
        }
    });
}



var latLngs = [
    [30.1459, 78.5993],
    [30.0869, 78.2676],
    [29.9457, 78.1642],
    [26.4499, 80.3319],
    [25.4358, 81.8463],
    [25.3176, 82.9739],
    [25.5941, 85.1376],
    [22.5726, 88.3639]
];