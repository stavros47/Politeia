"use strict";

window.addEventListener('load', function () {

    showRegistrationForm();
    //Flag to use in checking errors
    var passwordError = false;
    var mapHiddenFlag = true;
    var addressEmpty = true;
    //Commonly used elements
    var usernameElement = document.getElementById('InputUsername');
    
    var passwordElement = document.getElementById('InputPassword');
    var retypePasswordElement = document.getElementById('InputPassword2');   
    var CityElement = document.getElementById('InputCity');
    var addressElement = document.getElementById('InputAddress');   
    

    function elementsToArray() {
        var elementsArray = [];
        elementsArray.push(document.getElementById('InputUsername'));
        elementsArray.push(document.getElementById('InputEmail'));
        elementsArray.push(document.getElementById('InputPassword'));
        elementsArray.push(document.getElementById('InputPassword2'));
        elementsArray.push(document.getElementById('InputName'));
        elementsArray.push(document.getElementById('InputLastName'));
        elementsArray.push(document.getElementById('InputDOB'));
        elementsArray.push(document.getElementById('InputCity'));
        elementsArray.push(document.getElementById('InputAddress'));
        elementsArray.push(document.getElementById('InputInterests'));
        elementsArray.push(document.getElementById('InputInfo'));

        return elementsArray;
    }

   
      //Prevent Submit on non matching passwords - refactor todo
      var ValidateInputs = function () {
        var validForm = true;
        var elements = elementsToArray();
        checkPasswords();
        if (passwordError) {
            validForm = false;
        }
        for (var i = 0; i < elements.length; i++){
            if(elements[i].value == "" || elements[i] == null){
                showFeedBack(elements[i].name, "Empty"); 
                validForm= false;
                
            }else if (!elements[i].checkValidity()){
                showFeedBack(elements[i].name, "invalid");
                validForm= false;
            }    
        }       

        return validForm;
    }
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

  
    
    function collectFormData() {
        let data = new FormData();
        var form = document.getElementById("lqForm");
        for ( var i = 0; i < form.elements.length; i++ ) {
            var e = form.elements[i];
            //var value = ((e.getAttribute("type") == "radio") && (e.checked)) ? e.checked : e.value;            
            var value = e.value;
            
            if((e.name)&&(value !== "")){
                //encodeURIComponent(e.name)
                if((e.getAttribute("type") === "radio") && !(e.checked)){
                    continue;
                }else{                
                    data.append(e.name, value); 
                }
               
            }                        
        }
        return data;
    }

    function showFeedBack (elementName, validity) {
        var msg = "";        
        if(validity == "valid"){
            document.getElementsByName(elementName)[0].classList.remove('is-invalid');
            document.getElementsByName(elementName)[0].classList.add('is-valid');
            return;
        }        
        if(validity == 'Empty'){
            msg = "This field is required";           
        }else if(validity == 'invalid'){
            msg = document.getElementsByName(elementName)[0].title; 
        }     
        
        if(document.getElementById(elementName+"-feedback") != null) {
            document.getElementById(elementName+"-feedback").innerHTML = "Invalid input - " + msg;
        }
        
        document.getElementsByName(elementName)[0].classList.remove('is-valid');
        document.getElementsByName(elementName)[0].classList.add('is-invalid');
      
    }
    
    function checkResponse (resp) {   
        //
        let elements = elementsToArray();
        for (var i = 0; i < elements.length; i++){
            showFeedBack(elements[i].name,"valid");
        }
        
        
        for(var i = 0;i < resp.fields.length; i++){
            var field;            
            if (resp.fields[i].substring(0,5) === "Empty"){
                field = resp.fields[i].slice(5,resp.fields[i].length);             
                showFeedBack(field, "Empty");
               document.getElementsByName(field)[0].classList.remove('is-valid');
               document.getElementsByName(field)[0].classList.add('is-invalid');
                var msg = "This field is required";
                document.getElementById(field+"-feedback").innerHTML = "Invalid input - " + msg;               
                
            }else{
                field = resp.fields[i];
                showFeedBack(field, "invalid");                     
            }
        }
    }


    function handleResponse (resp, reqObj) {
        console.log("Response Received");        
        console.log(resp);
        if(reqObj.status === 200){   
            console.log("Registration Success!"); 
        }else if (reqObj.status === 409) {

            checkResponse(resp);
        }
    }

    function sendToServer (typeOfRequest, url, data){      
        var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {                
                var resp;
                console.log(this.response);
                resp = JSON.parse(this.response);
                handleResponse(resp, this);                    
               
            }
        };
         
        xhttp.open(typeOfRequest, url, true);       
        xhttp.send(data);
    }
    
    
    document.getElementById('submit').addEventListener('click', function (){      
        
        if(ValidateInputs()){
            let userData = collectFormData();
            var url = 'http://localhost:8084/lq/mainServlet';
            if(userData){
               sendToServer('POST', url, userData); 
            }
        }else{
            console.log("Field Invalid");
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
    
    usernameElement.onkeyup = function () {
        var checkbox = document.getElementById('checkbox-container');
        if (this.value != '') {
            checkbox.style.display = 'block';
        } else {
            checkbox.style.display = 'none';
        }
    }

    usernameElement.onblur = function () {
//        var data = new FormData();
//        data.append("check", "username");
//        data.append(usernameElement.name, usernameElement.value);
//        var url = 'http://localhost:8084/lq/mainServlet';
//        sendToServer('POST', url, data);
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
   console.log("main load");
});