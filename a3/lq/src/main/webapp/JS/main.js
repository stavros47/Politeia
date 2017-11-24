"use strict";

window.addEventListener('load', function () {

    //Flag to use in checking errors
    var passwordError = false;
    var mapHiddenFlag = true;
    var addressEmpty = true;
    //Commonly used elements
    var UsernameElement = document.getElementById('InputUsername');
    var passwordElement = document.getElementById('InputPassword');
    var retypePasswordElement = document.getElementById('InputPassword2');
    var addressElement = document.getElementById('InputAddress');
    var CityElement = document.getElementById('InputCity');

    //hide the video container
    //Face Recognition is enabled only when we check the checkbox.
    var faceCheckbox = document.getElementById('faceIDcheck');
    faceCheckbox.addEventListener('change', function () {
        var takePhotoContainer = document.getElementById('video-container');        
        if (this.checked) {
            faceRec.init();
            takePhotoContainer.style.display = 'block';
            document.getElementById('snap').focus();
        } else {
            takePhotoContainer.style.display = 'none';
        }
    });
    
    //Assigns the appropreate bootstrap classes to show (make visible) feedback/warning when needed.
    function showPasswordFeedback(passError) {
        if (passError) {
            /*
            Set the proper bootstrap classes to visually show errors
            */
            retypePasswordElement.classList.add('is-invalid');
            retypePasswordElement.classList.remove('is-valid');
            // Clear the fields and set focus to the password field
            //Checking if the value is not empty, because we might want to leave the input field blank for testing purposes
            if(retypePasswordElement.value != ''){
                retypePasswordElement.value = '';
                retypePasswordElement.focus();
            }

        } else {
            if(retypePasswordElement.value != ""){
                retypePasswordElement.classList.add('is-valid');
                retypePasswordElement.classList.remove('is-invalid');
            }
           
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
    
    function collectFormData() {
        let data = new FormData();
        var form = document.getElementById("lqForm");
        for ( var i = 0; i < form.elements.length; i++ ) {
            var e = form.elements[i];
            //var value = ((e.getAttribute("type") == "radio") && (e.checked)) ? e.checked : e.value;            
            var value = e.value;
            
            if((e.name)&&(value !== "")){
                //encodeURIComponent(e.name)
                if((e.getAttribute("type") == "radio") && !(e.checked)){
                    continue;
                }else{
                    //console.log("NAME: "+ e.name);
                    //console.log("VALUE: "+ value);
                    data.append(e.name, value); 
                }
               
            }                        
        }
        return data;
    }
    
    function sendToServer (typeOfRequest, url, data){
        //var data = document.getElementById("InputUsername").value;
        var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                 console.log("Response Received");
                 console.log(this.response);
                 var resp = JSON.parse(this.response);
                 console.log(resp);
                 console.log(resp.fields[0]);
                 //document.getElementById("test").innerHTML = this.response;
                
            }
        };
         
        xhttp.open(typeOfRequest, url, true);       
        xhttp.send(data);
    }
    
    
    document.getElementById('submit').addEventListener('click', function (){      
        
        let userData = collectFormData();
        var url = 'http://localhost:8084/lq/mainServlet';
        if(userData){
           sendToServer('POST', url, userData); 
        }
        
    });

    function getLocation() {
        var address = addressElement.value;
        var CityValue = document.getElementById('InputCity').value;
        var CountryValue = document.getElementById('countries').value;
        var location;
        if ((address == "") && (CityValue == "")) {
            return false;
        } else {
            if (address != "") {
                addressEmpty = false;
                location = address + ', ' + CityValue + ', ' + CountryValue;
            } else {
                addressEmpty = true;
                location = CityValue + ', ' + CountryValue;
            }
            return location;
        }

    }

    CityElement.onblur = function () {
        var location = getLocation();
        if (this.value != "") {
            var map = document.getElementById('map');
            if (map) {
                map.style.display = 'none';
                mapHiddenFlag = true;
            }
        }
        if (location) {
            MakeReq(location);
        }
    }

    addressElement.onblur = function () {
        var location = getLocation();
        //make this a function and put it onchange event
        if (this.value != "") {
            var map = document.getElementById('map');
            if (map) {
                map.style.display = 'none';
                mapHiddenFlag = true;
            }
        }
        if (location) {
            MakeReq(location);
        }
    }
    
    UsernameElement.onkeyup = function () {
        var checkbox = document.getElementById('checkbox-container');
        if (this.value != '') {
            checkbox.style.display = 'block';
        } else {
            checkbox.style.display = 'none';
        }
    }


    function createMapElements() {
        if (!document.getElementById('map-container')) {
            //Map Container
            var MapContainer = document.createElement('div');
            MapContainer.className = 'container';
            MapContainer.setAttribute('id', 'map-container');
            document.getElementById('InputAddress').insertAdjacentElement('afterend', MapContainer);
            //button
            var btnMap = document.createElement('button');
            btnMap.className = 'btn';
            btnMap.classList.add('btn-primary');
            btnMap.setAttribute('id', 'toggleMapBtn');
            btnMap.setAttribute('type', 'button');
            btnMap.innerHTML = 'Toggle Map';

            //Map
            var MapElement = document.createElement('div');
            MapElement.setAttribute('id', 'map');
            MapElement.style.display = 'none';
            document.getElementById('map-container').appendChild(btnMap);
            document.getElementById('map-container').appendChild(MapElement);

        }

    }

    function removeMapElements() {
        //remove button
        var element = document.getElementById('toggleMapBtn');
        if (element) {
            element.parentNode.removeChild(element);
            //remove map
            element = document.getElementById('map');
            element.parentNode.removeChild(element);
            //remove map container
            element = document.getElementById('map-container');
            element.parentNode.removeChild(element);
        }


    }

    //Check the response status and show/hide the appropreate warnings using the Bootstrap classes
    function checkAddress(response) {
        console.log(response);
        if (response.status == "ZERO_RESULTS") {
            removeMapElements();
            mapHiddenFlag = true;

            if (addressElement.value != "") {
                addressElement.classList.add('is-invalid');
                addressElement.classList.remove('is-valid');

            } else {
                if (CityElement.value != "") {
                    CityElement.classList.add('is-invalid');
                    CityElement.classList.remove('is-valid');
                }
            }

        } else if (response.status == "OK") {
            if (addressElement.value != "") {
                addressElement.classList.add('is-valid');
            }
            if (CityElement.value != "") {
                CityElement.classList.add('is-valid');
            }
            createMapElements();
            addressElement.classList.remove('is-invalid');
            CityElement.classList.remove('is-invalid');
        } else {
            console.log('Error occurred!');
        }
    }

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

    function geocodeAddress(geocoder, resultsMap, addressLocation) {

        geocoder.geocode({
            'address': addressLocation
        }, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {
                lat: -34.397,
                lng: 150.644
            }
        });
        var geocoder = new google.maps.Geocoder();
        //Get the location so we can pass it to geocodeAddress to place the marker
        var fullLocation = getLocation();
        geocodeAddress(geocoder, map, fullLocation);

    }



    document.addEventListener('click', function (e) {
        if (e.target.id == 'toggleMapBtn') {
            if (mapHiddenFlag) {
                document.getElementById('map').style.display = '';
                mapHiddenFlag = false;
            } else {
                document.getElementById('map').style.display = 'none';
                mapHiddenFlag = true;
            }
            initMap();
        }

    });

});