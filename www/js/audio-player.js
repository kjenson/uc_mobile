// The Audio player
var my_media = null;
var mediaTimer = null;
// duration of media (song)
var dur = -1;
// need to know when paused or not
var is_paused = false;
//Set audio position on page
function setAudioPosition(position) {
    $("#audio_position").html(position + " sec");
}

//onSuccess Callback
function onSuccess() {
    //setAudioPosition(dur);
    //clearInterval(mediaTimer);
    //mediaTimer = null;
    //my_media = null;
    //is_paused = false;
    //dur = -1;
    
    $('#audio-player').show();
}

//onError Callback
function onError(error) {
    /* alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
    is_paused = false;
    setAudioPosition("0"); */
    $('#audio-player').hide();
}

function playAudio(src) {

    my_media = new Media(src, onSuccess, onError);

   // Play audio
   my_media.play();

   // Update my_media position every second
   if (mediaTimer == null) {
       mediaTimer = setInterval(function() {
           // get my_media position
           my_media.getCurrentPosition(
               // success callback
               function(position) {
                   if (position > -1) {
                       setAudioPosition((position) + " sec");
                   }
               },
               // error callback
               function(e) {
                   console.log("Error getting pos=" + e);
                   setAudioPosition("Error: " + e);
               }
           );
       }, 1000);
   }

}

//Pause audio
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

//Stop audio
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

