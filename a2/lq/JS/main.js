"use strict";

window.addEventListener('load', function () {

    //TODO: Maybe refactor this to an implementation without using globals
    var addressEmpty = true;
    var passwordError = false;   
    var passwordElement = document.getElementById('InputPassword');
    var retypePasswordElement = document.getElementById('InputPassword2');
    var toggleMapButton = document.getElementById('toggleMapBtn');    
    toggleMapButton.style.visibility = 'hidden';
    var mapElement = document.getElementById('map');
    mapElement.style.visibility = 'hidden';
    var mapHiddenFlag = true;

    //Assigns the appropreate bootstrap classes to show (make visible) feedback/warning when needed.
    function showPasswordFeedback(passError) {
        if (passError) {
            /*
            Set the proper bootstrap classes to visually show errors
            */
            retypePasswordElement.classList.add('is-invalid');
            retypePasswordElement.classList.remove('is-valid');
            // Clear the fields and set focus to the password field
            passwordElement.value = '';
            retypePasswordElement.value = '';
            passwordElement.focus();
        } else {
            retypePasswordElement.classList.add('is-valid');
            retypePasswordElement.classList.remove('is-invalid');
        }
    }

    function checkPasswords() {
        var password = passwordElement.value;
        var retypePassword = retypePasswordElement.value;

        if (password != retypePassword) {
            passwordError = true;
        } else {
            passwordError = false;
        }
        showPasswordFeedback(passwordError);
    }

    retypePasswordElement.onblur = function () {
        checkPasswords();
    }

    //Prevent Submit on non matching passwords
    window.ValidateInputs = function () {
        checkPasswords();
        if (!passwordError) {
            return true;
        }
        return false;
    }

    var addressElement = document.getElementById('InputAddress');

    function getLocation(){
        var address = addressElement.value;
        var CityValue = document.getElementById('InputCity').value;
        var CountryValue = document.getElementById('countries').value
        var location;
        if (address != "") {
            addressEmpty = false;
            location = address + ', ' + CityValue + ', ' + CountryValue;
        } else {
            addressEmpty = true;
            location = CityValue + ', ' + CountryValue;            
        }
        return location;
    }

   
    addressElement.onblur = function () {
       var location = getLocation();
        if(!addressEmpty) {
            toggleMapButton.style.visibility = 'visible';
        }
        MakeReq(location);

    }

    //Optional todo: move the warning bootstrap classes functionality to the showPasswordFeedback and make that universal
    function checkAddress(response) {
        console.log(response);
        if (response.status == "ZERO_RESULTS") {
            addressElement.classList.add('is-invalid');
            addressElement.classList.remove('is-valid');

        } else if (response.status == "OK") {
            if (document.getElementById('InputAddress').value != "") {
                addressElement.classList.add('is-valid');
            }
            addressElement.classList.remove('is-invalid');
        } else {
            console.log('Error occurred!');
        }
    }

    //Optional: Call request function on submit
    var btn = document.getElementById('submit');
    btn.addEventListener('click', MakeReq);

    //Create and send a request to Google Geocode API
    function MakeReq(location) {
        var xhttp = new XMLHttpRequest();
        console.log('Response Object created!');

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var responseResult = JSON.parse(this.response);

                checkAddress(responseResult);
            }
        };
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyB3pGH041-hdat_tpiZtGwK24hfhySA-n4';

        xhttp.open('GET', url, true);
        xhttp.send();
    }

    toggleMapButton.addEventListener('click', function (){
        if(mapHiddenFlag){
            mapElement.style.visibility = 'visible';
            mapHiddenFlag = false;
        }else{
            mapElement.style.visibility = 'hidden';
            mapHiddenFlag = true;
        }
        initMap();
    });




    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        
          geocodeAddress(geocoder, map);
        
      }

      function geocodeAddress(geocoder, resultsMap) {
        var addressLocation = getLocation();
        geocoder.geocode({'address': addressLocation}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

});