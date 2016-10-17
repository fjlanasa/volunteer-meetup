function initMap() {
  if(document.getElementById('sites-text') != null){
    var siteAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('sites-text'));
  }
}
