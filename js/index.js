
var map;
var markers = [];
var marker;
var infoWindow;
function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 8,

        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

    });
    infoWindow = new google.maps.InfoWindow();
    searchStores();


    ;
}


function searchStores(){
  var foundStores = [];
  var zipCode = document.getElementById('zip-code-input').value;
  if(zipCode){
  stores.forEach(function(store){
    var postal = store.address.postalCode.substring(0,5);
    
    if(postal == zipCode){
      foundStores.push(store);

    }

  });
} else{
	foundStores = stores;
}
clearLocations()
displayStores(foundStores);
showStoresMarkers(foundStores);
setOnClickListener();

}

function clearLocations() {
         infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;


       }

function setOnClickListener(){
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
  elem.addEventListener('click', function(){
    google.maps.event.trigger(markers[index], 'click');

  })
});
}


function displayStores(stores){
  var storesHTML = "";

stores.forEach(function(store, index){
 var address = store.addressLines;
 var phone = store.phoneNumber;
  storesHTML += `
  <center>
  <div class="store-container-hover">
  <div class="store-container">


        <div class="store-address">
          <div class="store-info-contaner">
          <div class="info1">
          
          
          <p><span class="info1-block">${address[0]}</span><span class="info1-block">${address[1]}</span><span style="font-size: 16px";>${phone}</span>
            </p></div>
            
            <div class="no1">
            <i class="fas fa-info-circle "></i></div>
            </div><div class"store-phone-number"><p></p></div>
            <div class="index">${index+1}</div>
            <hr>
          </div>  
        
      </div>
      </div>
      </center>
  `


});
document.querySelector('.stores-list').innerHTML = storesHTML;
}



function showStoresMarkers(stores){
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store){
    var latlng = new google.maps.LatLng(
        store.coordinates.latitude,
        store.coordinates.longitude);
    
    var name = store.name;
    var address = store.addressLines[0];
    var openStatusText = store.openStatusText;
    var phoneNumber = store.phoneNumber;
    var coordinates = store.coordinates;
    bounds.extend(latlng);
    createMarker(latlng, name, address, openStatusText, phoneNumber, coordinates );



  })
  map.fitBounds(bounds);
}


 function createMarker(latlng, name, address, openStatusText, phoneNumber, coordinates, index ) {
    var html =  `
<div class="info-window">
<div><span class="info-name"><b>${name}</b></span></div>
<div><span class="info-open">${openStatusText}</span></div>
<hr>
<div><i class="fas fa-location-arrow"></i>&nbsp&nbsp<span class="info-address"><a href="https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}">${address}</a></span></div>
<div><i class="fas fa-phone"></i>&nbsp&nbsp<span class="info-number">${phoneNumber}</span></div>
</div>
`;

  var iconBase ='https://res.cloudinary.com/de8awjxjn/image/upload/v1590704203/mcdonalds-512.png';
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      icon: iconBase ,

      animation: google.maps.Animation.DROP,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);

}



