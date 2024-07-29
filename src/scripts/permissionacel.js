export function permission_accelerometers(){
    // Request permission for iOS 13+ devices
    if (DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
    }
}