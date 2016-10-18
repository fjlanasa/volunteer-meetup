
function initMap(data_sites) {
  if(document.getElementById('sites-text') != null){
    let siteAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('sites-text'));
  }
  if(document.getElementById('map') != null && data_sites != null){
    let map;
    let sites = data_sites;
    let markers = [];

    map =  new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2013549, lng: -90.9480244},
    zoom: 10});

    let largeInfowindow = new google.maps.InfoWindow();
    let bounds = new google.maps.LatLngBounds();
    for(let i = 0; i < sites.length; i++){
      let position = {lat: sites[i].lat, lng: sites[i].lng}
      let title = sites[i].location

      let marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      markers.push(marker);

      marker.addListener('click', function(){
        populateInfoWindow(this, largeInfowindow);
      });
      bounds.extend(markers[i].position);
    }

    function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent("<div class='infowindow'>" + marker.title + '</div>');
        infowindow.open(map, marker);
        infowindow.addListener('closeclick',function(){
          infowindow.marker = null;
        });
      }
    }
  }
}
