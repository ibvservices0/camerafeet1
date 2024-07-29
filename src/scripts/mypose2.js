export function do_pose2(){
    window.addEventListener("devicemotion", handleMotion2);
    navigator.mediaDevices.enumerateDevices().then(gotDevices2).then(start2).catch(handleError2);
    //start2();
    //navigator.mediaDevices.getUserMedia(constraints).then(gotStream2).catch(handleErrorBis2);
}


export function bt_pose2(){
    window.removeEventListener("devicemotion", handleMotion2);
    tomaFoto2();
}

function handleError2(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


function handleErrorBis2(error) {
    alert(error.message);
}


function gotDevices2(deviceInfos) {
    let myDeviceId;
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        option.text = deviceInfo.label ;
        if (deviceInfo.kind === 'videoinput') {
            if ((option.text.includes('0,'))||
                (option.text === 'Cámara trasera')||
                (option.text === 'Back Camera')){
                    myDeviceId = option.value;
                    break;
            } else {console.log('Some other kind of source/device: ', deviceInfo);}
            
        } else {
            console.log('Some other kind of source/device: ', deviceInfo);
        }
    }
    return myDeviceId;
}


function start2(myIdDevice) {
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    const videoSource = myIdDevice;
    /*
    const constraints = {
        audio: false,
        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    };
    */
   let constraints;
   if (videoSource){
        constraints = {
            audio: false,
            video: {deviceId: {exact: videoSource}}
        };
   }
   else{
        constraints = {
            audio: false,
            video: {facingMode: 'environment'}
        };
   }

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream2).catch(handleErrorBis2);
}


function gotStream2(stream) {
    let video = document.getElementById("vid_pose2");
    window.stream = stream; // make stream available to console

    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });

    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.applyConstraints({torch: true})
        .then(() => console.log(videoTrack.getSettings().torch));

}


function handleMotion2(event) {
    var acx_raw = event.accelerationIncludingGravity.x;
    var acy_raw = event.accelerationIncludingGravity.y;
    var acz_raw = event.accelerationIncludingGravity.z;
    var ac0_1 = 0;
    if (acx_raw > 9.8) ac0_1 = 9.8;
    else if (acx_raw < -9.8) ac0_1 = -9.8;
    else ac0_1 = acx_raw;
    var ac1_1 = 0;
    if (acy_raw > 9.8) ac1_1 = 9.8;
    else if (acy_raw < -9.8) ac1_1 = -9.8;
    else ac1_1 = acy_raw;
    var ac2_1 = 0;
    if (acz_raw > 9.8) ac2_1 = 9.8;
    else if (acz_raw < -9.8) ac2_1 = -9.8;
    else ac2_1 = acz_raw;
    let pose2 = {
        'ac0_1': ac0_1,
        'ac1_1': ac1_1,
        'ac2_1': ac2_1
    };
    localStorage.removeItem('feet_pose2');
    localStorage.setItem('feet_pose2', JSON.stringify(pose2));
    check_visible2(ac0_1, ac1_1, ac2_1);
}


function check_visible2(valueX, valueY, valueZ){
    let but2_pose2a = document.getElementById("btphoto_pose2a");
    let but2_pose2b = document.getElementById("btphoto_pose2b");
    var resp_check = false;
    var anguloX = Math.asin(valueX / -9.8) * 180 / Math.PI;
    anguloX = Math.abs(anguloX);
    if ((anguloX >= 10) && (anguloX <= 20)){
        resp_check = true;
    }
    var anguloY = Math.asin(valueY / -9.8) * 180 / Math.PI;
    anguloY = Math.abs(anguloY);
    if (anguloY > 10){
        resp_check = false;
    }

    if (resp_check){
        but2_pose2a.style.visibility = 'visible';
        but2_pose2b.style.visibility = 'visible';
    } 
    else{
        but2_pose2a.style.visibility = 'hidden';
        but2_pose2b.style.visibility = 'hidden';
    } 
}


function tomaFoto2(){
    let videoBis = document.getElementById("vid_pose2");
    let canvasLandscape = document.getElementById("thecanvas2landscape");
    let ctxLandscape = canvasLandscape.getContext('2d');
    ctxLandscape.clearRect(0, 0, canvasLandscape.width, canvasLandscape.height);
    ctxLandscape.drawImage(videoBis, 0, 0, canvasLandscape.width, canvasLandscape.height);

    const the_dataURL = canvasLandscape.toDataURL('image/jpeg', 1.0);;
    // Logs data:image/png;base64,wL2dvYWwgbW9yZ...
    const the_base64 = getBase64StringFromDataURL2(the_dataURL);
    // Logs wL2dvYWwgbW9yZ...
    localStorage.removeItem('feet_photo2');
    localStorage.setItem('feet_photo2', the_base64);
}


const getBase64StringFromDataURL2 = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');