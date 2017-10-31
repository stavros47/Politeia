"use strict";

window.addEventListener('load', function () {
    
    var passwordError = false;
    //TODO: Maybe refactor this to an implementation without using globals
    var passwordElement = document.getElementById('InputPassword');
    var retypePasswordElement = document.getElementById('InputPassword2');

    function showPasswordFeedback(passError) {
        if(passError){
            /*
            Set the proper bootstrap classes to visually show errors
            */        
            retypePasswordElement.classList.add('is-invalid');
            retypePasswordElement.classList.remove('is-valid');
            // Clear the fields and set focus to the password field
            passwordElement.value = '';
            retypePasswordElement.value ='';
            passwordElement.focus();
        } else {
            retypePasswordElement.classList.add('is-valid');
            retypePasswordElement.classList.remove('is-invalid');
        }
    }

    function checkPasswords(){       
        var password = passwordElement.value;
        var retypePassword = retypePasswordElement.value;

        if (password != retypePassword){                
            passwordError = true;                     
        } else {        
            passwordError = false;           
        }
       showPasswordFeedback(passwordError);  
    }

    retypePasswordElement.onblur = function () {
        checkPasswords();
    }

    window.ValidateInputs = function (){        
        checkPasswords();
        if(!passwordError){
            return true;
        }
        return false;
    }
    var addressElement = document.getElementById('InputAddress')
    addressElement.onblur = function () {
        var address = addressElement.value;
        if(address){
            MakeReq(address);
        }
        
    }

    //todo: move the warning bootstrap classes functionality to the showPasswordFeedback and make that universal
    function checkAddress(response){
       if(response.status == "ZERO_RESULTS"){
        addressElement.classList.add('is-invalid');
        addressElement.classList.remove('is-valid');

       }else if(response.status == "OK"){
        addressElement.classList.add('is-valid');
        addressElement.classList.remove('is-invalid');
       }else{
           console.log('Error occurred!');
       }   
    }


    var btn = document.getElementById('submit');
    btn.addEventListener('click', MakeReq);

    function MakeReq(address){
          var xhttp = new XMLHttpRequest();
        console.log('Response Object created!');

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
              var responseResult = JSON.parse(this.response);
             
              checkAddress(responseResult);
            }
        };
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyB3pGH041-hdat_tpiZtGwK24hfhySA-n4';
       
        xhttp.open('GET',url,true);
        xhttp.send();
    }
   
});