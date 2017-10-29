"use strict";

window.addEventListener('load', function () {
    
    var passwordError = false;
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

   
});