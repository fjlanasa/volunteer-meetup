let map;
let sites = [];
let markers = [];
function initMap() {
  if(document.getElementById('sites-text') != null){
    var siteAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('sites-text'));
  }

  if(document.getElementById('map') != null){
    map =  new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2013549, lng: -90.9480244},
    zoom: 10});

    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      console.log(data.sites[0].location);
      sites = data.sites
      console.log(sites[0].location)
    })
    for(let i = 0; i < sites.length; i++){
      let position = 
    }
  }
}
