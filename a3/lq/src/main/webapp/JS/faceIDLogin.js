'use strict';

/*
    Author: Panagiotis Papadakos papadako@csd.uoc.gr

    For the needs of the hy359 2017 course
    University of Crete

*/
window.addEventListener('load', function () {
  var takePhotoContainer = document.getElementById('video-container');
  //hide the container
  takePhotoContainer.style.display = 'none';
  //Face Recognition is enabled only when we check the checkbox.
  var faceCheckbox = document.getElementById('faceIDcheck');
  faceCheckbox.addEventListener('change', function () {
    if (this.checked) {
      faceRec.init();
      takePhotoContainer.style.display = '';
    } else {
      takePhotoContainer.style.display = 'none';
    }
  });
});
/*  face recognition that is based on faceplusplus service */
var faceRec = (function () {

  // Object that holds anything related with the facetPlusPlus REST API Service
  var faceAPI = {
    apiKey: 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c',
    apiSecret: '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip',
    app: 'hy359',
    // Detect
    // https://console.faceplusplus.com/documents/5679127
    detect: 'https://api-us.faceplusplus.com/facepp/v3/detect', // POST
    // Set User ID
    // https://console.faceplusplus.com/documents/6329500
    setuserId: 'https://api-us.faceplusplus.com/facepp/v3/face/setuserid', // POST
    // Get User ID
    // https://console.faceplusplus.com/documents/6329496
    getDetail: 'https://api-us.faceplusplus.com/facepp/v3/face/getdetail', // POST
    // addFace
    // https://console.faceplusplus.com/documents/6329371
    addFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface', // POST
    // Search
    // https://console.faceplusplus.com/documents/5679127
    search: 'https://api-us.faceplusplus.com/facepp/v3/search', // POST
    // Create set of faces
    // https://console.faceplusplus.com/documents/6329329
    create: 'https://api-us.faceplusplus.com/facepp/v3/faceset/create', // POST
    // update
    // https://console.faceplusplus.com/documents/6329383
    update: 'https://api-us.faceplusplus.com/facepp/v3/faceset/update', // POST
    // removeface
    // https://console.faceplusplus.com/documents/6329376
    removeFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/removeface', // POST
  };

  // Object that holds anything related with the state of our append
  // Currently it only holds if the snap button has been pressed
  var state = {
    photoSnapped: false,
  };

  // function that returns a binary representation of the canvas
  function getImageAsBlobFromCanvas(canvas) {

    // function that converts the dataURL to a binary blob object
    function dataURLtoBlob(dataUrl) {
      // Decode the dataURL
      var binary = atob(dataUrl.split(',')[1]);

      // Create 8-bit unsigned array
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Return our Blob object
      return new Blob([new Uint8Array(array)], {
        type: 'image/jpg',
      });
    }

    var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
    return dataURLtoBlob(fullQuality);

  }

  // function that returns a base64 representation of the canvas
  function getImageAsBase64FromCanvas(canvas) {
    // return canvas.toDataURL('image/jpeg', 1.0);
    //   //this regex below removes everything but the base64 string
    var dataURL = canvas.toDataURL('image/jpeg', 1.0);
    //remove prefix and leave only the base64 string
    return dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");

  }

  // Function called when we upload an image
  function uploadImage() {
    if (state.photoSnapped) {
      var canvas = document.getElementById('canvas');
      var image = getImageAsBlobFromCanvas(canvas);

      // TODO!!! Well this is for you ... YES you!!!
      // Good luck!

      // Create Form Data. Here you should put all data
      // requested by the face plus plus services and
      // pass it to ajaxRequest
      var data = new FormData();
      data.append('api_key', faceAPI.apiKey);
      data.append('api_secret', faceAPI.apiSecret);
      // var img_blob = getImageAsBlobFromCanvas(canvas);
      // data.append('image_file', img_blob);
      var base64_img = getImageAsBase64FromCanvas(canvas);
      //console.log('Base64:' + base64_img);
      data.append('image_base64', base64_img);
      data.append('outer_id', faceAPI.app);
      data.append('return_result_count', 5);
      // add also other query parameters based on the request
      // you have to send

      // You have to implement the ajaxRequest. Here you can
      // see an example usage of how you should call this
      // First argument: the HTTP method
      // Second argument: the URI where we are sending our request
      // Third argument: the data (the parameters of the request)


      ajaxRequest('POST', faceAPI.search, data);

    } else {
      alert('No image has been taken!');
    }

  }

  // Function for initializing things (event handlers, etc...)
  function init() {
    // Put event listeners into place
    // window.addEventListener('DOMContentLoaded', function() {
    // Grab elements, create settings, etc.
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var UsernameElement = document.getElementById('InputUsername');
    var passwordElement = document.getElementById('InputPassword');

    var mediaConfig = {
      video: true,
    };
    var errBack = function (e) {
      console.log('An error has occurred!', e);
    };

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      });
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
      context.drawImage(video, 0, 0, 640, 480);
      state.photoSnapped = true; // photo has been taken
    });

    // Trigger when upload button is pressed
    document.getElementById('upload').addEventListener('click', uploadImage);


    //  }, false);

  }

  // !!!!!!!!!!! ================ TODO  ADD YOUR CODE HERE  ====================
  function toggleWarning(create) {
    if (create) {
      let warningElement = document.createElement('div');
      warningElement.innerHTML = "<strong>No faces Detected! Try Again!</strong>";
      warningElement.style.color = 'red';
      warningElement.style.textAlign = 'center';
      warningElement.setAttribute('id', 'warningElement');
      document.getElementById('video-container').insertAdjacentElement('afterbegin', warningElement);
    } else {
      var element = document.getElementById('warningElement');
      if (element) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function handleResponses(response, url, data) {
    if (response.results !== undefined) {
      //Remove warning if it was previously created
      toggleWarning(false);
      //get the username from the response
      //Results Array is automatically sorted from the highest condifence to the lowest, so the first result is always the one we want
      var userValue = response.results[0].user_id;
      console.log(userValue);

      //hide the container
      document.getElementById('video-container').style.display = 'none';
      //Face Recognition is enabled only when we check the checkbox.
      document.getElementById('faceIDcheck').checked = false;
      document.getElementById('InputUsername').focus();
      document.getElementById('InputUsername').value = userValue;
    } else {
      toggleWarning(true);
      console.log('No Faces were detected! Try again!');
    }

  }

  //Request Implementation(s):

  //Detect
  function ajaxRequest(typeOfRequest, url, data) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var responseResult = JSON.parse(this.response);
        console.log(responseResult);
        handleResponses(responseResult, url, data);
      }
    };

    xhttp.open(typeOfRequest, url, true);
    xhttp.send(data);
  }
  // !!!!!!!!!!! =========== END OF TODO  ===============================

  // Public API of function for facet recognition
  // You might need to add here other methods based on your implementation
  return {
    init: init,
  };

})();