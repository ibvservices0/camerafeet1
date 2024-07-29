export function do_pose3(){
    window.addEventListener("devicemotion", handleMotion3);
    navigator.mediaDevices.enumerateDevices().then(gotDevices3).then(start3).catch(handleError3);
    //start3();
    //navigator.mediaDevices.getUserMedia(constraints).then(gotStream3).catch(handleErrorBis3);
}

export function bt_pose3(){
    window.removeEventListener("devicemotion", handleMotion3);
    tomaFoto3();
}


function handleError3(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


function handleErrorBis3(error) {
    alert(error.message);
}


function gotDevices3(deviceInfos) {
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


function start3(myIdDevice) {
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

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream3).catch(handleErrorBis3);
}


function gotStream3(stream) {
    let video = document.getElementById("vid_pose3");
    window.stream = stream; // make stream available to console

    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });

    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.applyConstraints({torch: true})
        .then(() => console.log(videoTrack.getSettings().torch));

}


function handleMotion3(event) {
    var acx_raw = event.accelerationIncludingGravity.x;
    var acy_raw = event.accelerationIncludingGravity.y;
    var acz_raw = event.accelerationIncludingGravity.z;
    var ac0_2 = 0;
    if (acx_raw > 9.8) ac0_2 = 9.8;
    else if (acx_raw < -9.8) ac0_2 = -9.8;
    else ac0_2 = acx_raw;
    var ac1_2 = 0;
    if (acy_raw > 9.8) ac1_2 = 9.8;
    else if (acy_raw < -9.8) ac1_2 = -9.8;
    else ac1_2 = acy_raw;
    var ac2_2 = 0;
    if (acz_raw > 9.8) ac2_2 = 9.8;
    else if (acz_raw < -9.8) ac2_2 = -9.8;
    else ac2_2 = acz_raw;
    let pose3 = {
        'ac0_2': ac0_2,
        'ac1_2': ac1_2,
        'ac2_2': ac2_2
    };
    localStorage.removeItem('feet_pose3');
    localStorage.setItem('feet_pose3', JSON.stringify(pose3));
    check_visible3(ac0_2, ac1_2, ac2_2);
}


function check_visible3(valueX, valueY, valueZ){
    let but2_pose3a = document.getElementById("btphoto_pose3a");
    let but2_pose3b = document.getElementById("btphoto_pose3b");
    var resp_check = false;
    var anguloX = Math.asin(valueX / -9.8) * 180 / Math.PI;
    anguloX = Math.abs(anguloX);
    if ((anguloX >= 30) && (anguloX <= 50)){
        resp_check = true;
    }
    var anguloY = Math.asin(valueY / -9.8) * 180 / Math.PI;
    anguloY = Math.abs(anguloY);
    if (anguloY > 10){
        resp_check = false;
    }
    
    if (resp_check){
        but2_pose3a.style.visibility = 'visible';
        but2_pose3b.style.visibility = 'visible';
    } 
    else{
        but2_pose3a.style.visibility = 'hidden';
        but2_pose3b.style.visibility = 'hidden';
    } 
}


function tomaFoto3(){
    let videoBis = document.getElementById("vid_pose3");
    let canvasLandscape = document.getElementById("thecanvas3landscape");
    let ctxLandscape = canvasLandscape.getContext('2d');
    ctxLandscape.clearRect(0, 0, canvasLandscape.width, canvasLandscape.height);
    ctxLandscape.drawImage(videoBis, 0, 0, canvasLandscape.width, canvasLandscape.height);

    const the_dataURL = canvasLandscape.toDataURL('image/jpeg', 1.0);;
    // Logs data:image/png;base64,wL2dvYWwgbW9yZ...
    const the_base64 = getBase64StringFromDataURL3(the_dataURL);
    // Logs wL2dvYWwgbW9yZ...
    localStorage.removeItem('feet_photo3');
    localStorage.setItem('feet_photo3', the_base64);
}


export function releaseTorch3(){
    /*Begin-NoFunciona
    let videoBiss = document.getElementById("vid_pose3");
    const videoTrackBiss = videoBiss.srcObject.getVideoTracks()[0];
    videoTrackBiss.applyConstraints({torch: false})
        .then(() => console.log(videoTrackBiss.getSettings().torch));
    End-NoFunciona*/
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
}


const getBase64StringFromDataURL3 = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');