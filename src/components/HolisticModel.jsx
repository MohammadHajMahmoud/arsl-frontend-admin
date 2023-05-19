import {Holistic} from "@mediapipe/holistic";

function HolisticModel(onResult){

    const BASE_PATH = 'https://cdn.jsdelivr.net/npm/@mediapipe/holistic/';
    const holistic = new Holistic({locateFile: file => `${BASE_PATH}${file}`});

    holistic.setOptions({
        modelComplexity: 1, 
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
    });
    
    holistic.onResults(onResult);
    return holistic;
}

export default HolisticModel;