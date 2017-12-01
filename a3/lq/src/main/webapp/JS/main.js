"use strict";

window.addEventListener('load', function () {
    //main page shows
    showLoginPage();
    //showRegistrationForm();
    //Flags to use in checking errors
    var passwordError = false;
    var mapHiddenFlag = true;
    var addressEmpty = true;
    //Commonly used elements
   
    var elementsArray = [];

    


    function optionalElementsToArray() {
        var optionalElements = [];
        optionalElements.push(document.getElementById('InputAddress'));
        optionalElements.push(document.getElementById('InputInterests'));
        optionalElements.push(document.getElementById('InputInfo'));

        return optionalElements;
    }

    function elementsToArray(context) {
        elementsArray = [];

        if (context == "register") {
            elementsArray.push(document.getElementById('InputUsername'));
            elementsArray.push(document.getElementById('InputEmail'));
            elementsArray.push(document.getElementById('InputPassword'));
            elementsArray.push(document.getElementById('InputPassword2'));
            elementsArray.push(document.getElementById('InputName'));
            elementsArray.push(document.getElementById('InputLastName'));
            elementsArray.push(document.getElementById('InputDOB'));
            elementsArray.push(document.getElementById('InputCity'));
            elementsArray.push(document.getElementById('InputProfession'));
        } else if (context == "login") {
            elementsArray.push(document.getElementById("loginUsername"));
            elementsArray.push(document.getElementById("loginPassword"));
        }

        return elementsArray;
    }


    //Prevent Submit on non matching passwords - refactor todo
    var ValidateInputs = function () {
        var validForm = true;
        var elements = elementsToArray();
        var optionalElem = optionalElementsToArray();
        checkPasswords();
        if (passwordError) {
            validForm = false;
        }
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].value == "" || elements[i] == null) {
                showFeedBack(elements[i].name, "Empty");
                validForm = false;

            } else if (!elements[i].checkValidity()) {
                showFeedBack(elements[i].name, "invalid");
                validForm = false;
            }
        }

        for (var i = 0; i < optionalElem.length; i++) {
            if (!optionalElem[i].checkValidity()) {
                showFeedBack(optionalElem[i].name, "invalid");
                validForm = false;
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
            document.getElementById('InputPassword2').classList.add('is-invalid');
            document.getElementById('InputPassword2').classList.remove('is-valid');
            // Clear the fields and set focus to the password field
            //Checking if the value is not empty, because we might want to leave the input field blank for testing purposes
            if (document.getElementById('InputPassword2').value != '') {
                document.getElementById('InputPassword2').value = '';
                document.getElementById('InputPassword2').focus();
            }

        } else {
            if (document.getElementById('InputPassword2').value != "") {
                document.getElementById('InputPassword2').classList.add('is-valid');
                document.getElementById('InputPassword2').classList.remove('is-invalid');
            }

        }
    }

    function checkPasswords() {
        var password = document.getElementById('InputPassword').value;
        var retypePassword = document.getElementById('InputPassword2').value;

        if (password != retypePassword) {
            passwordError = true;
        } else {
            passwordError = false;
        }
        showPasswordFeedback(passwordError);
    }


    function collectFormData(form) {
        let data = new FormData();
        var form = document.getElementById(form);
        
        for (var i = 0; i < form.elements.length; i++) {

            var e = form.elements[i];
            var value = e.value;
            //console.log("Name: " + e.name + " ID: " + e.id);
            if ((e.name) && (value !== "")) {
                //encodeURIComponent(e.name)
                if ((e.getAttribute("type") === "radio") && !(e.checked)) {
                    continue;
                } else {
                     console.log("Name: " + e.name + " Val: " + value + "ID:" + e.id);
                    elementsArray.push(document.getElementById(e.id));
                    data.append(e.name, value);
                }

            }
        }
        return data;
    }

    function showFeedBack(elementName, validity) {
        var msg = "";
        if (validity == "valid") {
            document.getElementsByName(elementName)[0].classList.remove('is-invalid');
            document.getElementsByName(elementName)[0].classList.add('is-valid');
            return;
        }
        if (validity == "Empty") {
            msg = "This field is required";
        } else if (validity == 'invalid') {
            msg = document.getElementsByName(elementName)[0].title;
        } else if (validity == "duplicate") {
            msg = "This " + elementName + " already exists! Choose a different one.";
        } else if (validity == "wrong") {
            msg = "Wrong Password - Try again"
        }

        if (document.getElementById(elementName + "-feedback") != null) {
            document.getElementById(elementName + "-feedback").innerHTML = "Invalid input - " + msg;
        }

        document.getElementsByName(elementName)[0].classList.remove('is-valid');
        document.getElementsByName(elementName)[0].classList.add('is-invalid');

    }

    function checkResponse(resp, context) {
        let elements;
        if (context == "update") {
            elements = elementsArray;
        } else {
            elements = elementsToArray(context);
        }

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].value != "") {
                showFeedBack(elements[i].name, "valid");
            }
        }
        for (var i = 0; i < resp.fields.length; i++) {
            var field;
            if (resp.fields[i].substring(0, 5) === "Empty") {
                field = resp.fields[i].slice(5, resp.fields[i].length);
                showFeedBack(field, "Empty");

            } else if (resp.fields[i].substring(0, 9) === "Duplicate") {
                field = resp.fields[i].slice(9, resp.fields[i].length);
                showFeedBack(field, "duplicate");
            } else if (resp.fields[i].substring(0, 7) === "invalid") {
                field = resp.fields[i].slice(7, resp.fields[i].length);;
                showFeedBack(field, "wrong");
            } else {
                field = resp.fields[i];
                showFeedBack(field, "invalid");
            }
        }
    }
    //refactor
    function fillPage(resp, postfix) {
        if (document.getElementById("username" + postfix)) {
            document.getElementById("username" + postfix).innerHTML = resp.user.userName;
        }
        if (document.getElementById("email" + postfix)) {
            document.getElementById("email" + postfix).innerHTML = resp.user.email;
        }
        if (document.getElementById("firstname" + postfix)) {
            document.getElementById("firstname" + postfix).innerHTML = resp.user.firstName;
        }
        if (document.getElementById("lastname" + postfix)) {
            document.getElementById("lastname" + postfix).innerHTML = resp.user.lastName;
        }
        if (document.getElementById("genderS" + postfix)) {
            document.getElementById("genderS" + postfix).innerHTML = resp.user.gender;
        }
        if (document.getElementById("birthdate" + postfix)) {
            document.getElementById("birthdate" + postfix).innerHTML = resp.user.birthDate;
        }
        if (document.getElementById("country" + postfix)) {
            document.getElementById("country" + postfix).innerHTML = resp.user.country;
        }
        if (document.getElementById("town" + postfix)) {
            document.getElementById("town" + postfix).innerHTML = resp.user.town;
        }
        if (document.getElementById("address" + postfix)) {
            document.getElementById("address" + postfix).innerHTML = resp.user.address;
        }
        if (document.getElementById("occupation" + postfix)) {
            document.getElementById("occupation" + postfix).innerHTML = resp.user.occupation;
        }
        if (document.getElementById("moreinfo" + postfix)) {
            document.getElementById("moreinfo" + postfix).innerHTML = resp.user.info;
        }
        if (document.getElementById("interests" + postfix)) {
            document.getElementById("interests" + postfix).innerHTML = resp.user.interests;
        }


    }


    function handleResponse(resp, reqObj) {
        console.log("Response Received");
        console.log(resp);
        if (reqObj.status === 200) {
            if (resp.status == "Registration_Success") {
                console.log("Registration Success!");
                showSuccessPage();
                fillPage(resp, "");
            }

            if (resp.status == "Login_success" || resp.status == "Cancel") {
                console.log("Login Success!");
                showUserPage();
                fillPage(resp, "-login");
            }

            if (resp.status == "Edit_user") {
                console.log("You can now edit the user:");
                showEditUserPage();
                //fillPage(resp, "-edit");
            }
            if (resp.status == "Update_success") {
                console.log("User info updated!");
                showUserPage();
                fillPage(resp, "-login");
            }
            if(resp.status == "signout"){
                showLoginPage();
            }
            
        } else if (reqObj.status === 409) {
            if (resp.status == "Invalid_login" || resp.status == "user_unknown") {
                console.log("Login Failed!");
                checkResponse(resp, "login");
            } else if (resp.status == "Invalid_fields") {
                console.log("Registration Failed!");
                checkResponse(resp, "register");
            } else if (resp.status == "update_failed") {
                console.log("Update failed");
                checkResponse(resp, "update");
            }

        }
    }

    function sendToServer(typeOfRequest, url, data) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {

                var resp;
                console.log(this.response);
                if (this.response) {
                    resp = JSON.parse(this.response);
                    handleResponse(resp, this);
                }
            }
        };

        xhttp.open(typeOfRequest, url, true);
        xhttp.send(data);
    }

    //Listener functions
    function submitRegistrationForm() {
        if (ValidateInputs()) {
            let userData = collectFormData("lqForm");
            var url = 'http://localhost:8084/lq/mainServlet';
            if (userData) {
                sendToServer('POST', url, userData);
            }
        } else {
            //console.log("Field Invalid");
        }
    }

    
    function checkCityGeocode() {
        var location = getLocation();
        if (document.getElementById("InputCity").value != "") {
            var map = document.getElementById('map');
            if (map) {
                map.style.display = 'none';
                mapHiddenFlag = true;
            }
        }
        if (location) {
            GeocodeRequest(location);
        }
    }


    function checkAddressGeocode() {
        var location = getLocation();
        //make this a function and put it onchange event
        if (document.getElementById("InputAddress").value != "") {
            var map = document.getElementById('map');
            if (map) {
                map.style.display = 'none';
                mapHiddenFlag = true;
            }
        }
        if (location) {
            GeocodeRequest(location);
        }
    }

    function toggleFaceIdCheckbox() {
        var checkbox = document.getElementById('checkbox-container');
        if (document.getElementById('InputUsername').value != '') {
            checkbox.style.display = 'block';
        } else {
            checkbox.style.display = 'none';
        }
    }

    function checkExistingUsername() {
        console.log("checkusername");
        var data = new FormData();
        data.append("check", "username");
        data.append(document.getElementById('InputUsername').name, document.getElementById('InputUsername').value);
        var url = 'http://localhost:8084/lq/mainServlet';
        sendToServer('POST', url, data);
    }

    
    function checkExistingEmail(){
        var data = new FormData();
        data.append("check", "email");
        data.append(document.getElementById('InputEmail').name, document.getElementById('InputEmail').value);
        var url = 'http://localhost:8084/lq/mainServlet';
        sendToServer('POST', url, data);
    }



    //--



    function getLocation() {
        var address = document.getElementById('InputAddress').value;
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

            if (document.getElementById('InputAddress').value != "") {
                document.getElementById('InputAddress').classList.add('is-invalid');
                document.getElementById('InputAddress').classList.remove('is-valid');

            } else {
                if (document.getElementById('InputCity').value != "") {
                    document.getElementById('InputCity').classList.add('is-invalid');
                    document.getElementById('InputCity').classList.remove('is-valid');
                }
            }

        } else if (response.status == "OK") {
            if (document.getElementById('InputAddress').value != "") {
                document.getElementById('InputAddress').classList.add('is-valid');
            }
            if (document.getElementById('InputCity').value != "") {
                document.getElementById('InputCity').classList.add('is-valid');
            }
            createMapElements();
            document.getElementById('InputAddress').classList.remove('is-invalid');
            document.getElementById('InputCity').classList.remove('is-invalid');
        } else {
            console.log('Error occurred!');
        }
    }

    //Create and send a request to Google Geocode API
    function GeocodeRequest(location) {
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

document.addEventListener('keyup', function (e) {
    if (e.target.id == 'InputUsername') {
        toggleFaceIdCheckbox();
    }
    
});

function RegistrationEventListeners(){
    document.getElementById("InputCity").addEventListener('blur', checkCityGeocode);
     document.getElementById("InputAddress").addEventListener('blur', checkAddressGeocode);
      document.getElementById("InputPassword2").addEventListener('blur', checkPasswords);
       document.getElementById("InputUsername").addEventListener('blur', checkExistingUsername);
        document.getElementById("InputEmail").addEventListener('blur', checkExistingEmail);
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
        } else if (e.target.id == 'signUpButton') {
            showRegistrationForm();
            RegistrationEventListeners();
        } else if (e.target.id == "edit") {
            console.log("Edit");
            let data = new FormData();
            data.append("button", "edit");

            var url = 'http://localhost:8084/lq/userServlet';
            if (data) {
                sendToServer('POST', url, data);
            }
        } else if (e.target.id == "SignOut") {
            location.reload();
        } else if (e.target.id == "update-fields") {
            console.log("Update");
            let userData = collectFormData("editForm");
            userData.append("button", "update");
            var url = 'http://localhost:8084/lq//userServlet';
            if (userData) {
                sendToServer('POST', url, userData);
            }
        }else if (e.target.id == "submit") {
            submitRegistrationForm();
        } else if (e.target.id == "signInButton"){
             let loginUsername = document.getElementById("loginUsername");
                        let loginPassword = document.getElementById("loginPassword");
                        if (true) {
                                console.log("Sending Sign In request");
                                let loginData = new FormData();
                                loginData.append(loginUsername.name, loginUsername.value);
                                loginData.append(loginPassword.name, loginPassword.value);
                                var url = 'http://localhost:8084/lq/lqLoginServlet';
                                if (loginData) {
                                        sendToServer('POST', url, loginData);
                                }
                        } else {
                                //console.log("Field Invalid");
                        }
        } else if (e.target.id == "home"){
            showLoginPage();
        }  else if (e.target.id == "cancel") {
            console.log("cancel");
            let data = new FormData();
            data.append("button", "cancel");

            var url = 'http://localhost:8084/lq/userServlet';
            if (data) {
                sendToServer('POST', url, data);
            }
            
        }else if (e.target.id == "signout") {
            console.log("cancel");
            let data = new FormData();
            data.append("button", "signout");

            var url = 'http://localhost:8084/lq/userServlet';
            if (data) {
                sendToServer('POST', url, data);
            }
        }

    });


    console.log("main load");
});