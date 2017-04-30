/**
 * Web rtc
 */

export function getLocalMedia(props) {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  const constraints = {
    audio: true,
    video: true,
  };
  // const video = document.querySelector('video');

  function successCallback(stream) {
    window.stream = stream; // stream available to console
    if (window.URL) {
      props.onGetUserMediaSuccess(window.URL.createObjectURL(stream));
    } else {
      props.onGetUserMediaSuccess(stream);
    }
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
