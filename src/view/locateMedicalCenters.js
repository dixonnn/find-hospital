/**
 * Created by chris on 7/7/17.
 */
nmc.view.locateMedicalCenters = {
    getLocation: function() {
        var i=0, key="", keys=[], distanceArray={}, curData, curLoc;
        var min = Number.MAX_VALUE, minKey;
        var nameEl = document.getElementById("name"),
            addrEl = document.getElementById("addr"),
            distEl = document.getElementById("dist");

        // Get Current Location
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                // Create temp Location object for current location
                curData = {
                    title: "here",
                    address: "here",
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                curLoc = new Location(curData);

                // Loop through hospital locations, create objects, compute distance
                keys = Object.keys(hospitals);
                for(i; i < keys.length; i++) {
                    key = keys[i];
                    console.log("Lat: " + hospitals[key].lat);
                    var hosLoc = new Location({
                        title: hospitals[key].title,
                        address: hospitals[key].address,
                        lat: hospitals[key].lat,
                        lng: hospitals[key].lng
                    });
                    distanceArray[key] = Location.getDistance(curLoc, hosLoc);

                    // If distance is shorter than former min, replace and note key
                    if(distanceArray[key] < min) {
                        min = distanceArray[key];
                        minKey = key;
                    }
                    console.log("distanceArray[key] = " + distanceArray[key]);
                }

                nameEl.innerHTML = hospitals[minKey].title;
                addrEl.innerHTML = hospitals[minKey].address;
                distEl.innerHTML = "Distance: " + (distanceArray[minKey] * 0.00062137).toFixed(3) + " miles.";
            });
        } else {
            alert("Error: Browser doesn't support GPS.");
        }
    }
};