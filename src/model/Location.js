/**
 * Created by chris on 7/7/17.
 */
function Location(slots) {
    this.title = slots.title;
    this.address = slots.address;
    this.lat = slots.lat;
    this.lng = slots.lng;
}

Location.instances = {};

Location.getDistance = function(loc1, loc2) {
    var start, end;

    start = new google.maps.LatLng({
        lat: loc1.lat,
        lng: loc1.lng
    });

    end = new google.maps.LatLng({
        lat: loc2.lat,
        lng: loc2.lng
    });

    dist = google.maps.geometry.spherical.computeDistanceBetween(start, end);
    console.log("Distance between locations: " + dist + " meters.");
    return dist;
};