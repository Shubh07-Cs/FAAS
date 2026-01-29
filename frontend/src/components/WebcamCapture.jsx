import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user"
};

export const WebcamCapture = ({ onCapture, buttonText = "Capture" }) => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    }, [webcamRef, onCapture]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="border-4 border-indigo-500 rounded-lg overflow-hidden shadow-lg">
                <Webcam
                    audio={false}
                    height={480}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={720}
                    videoConstraints={videoConstraints}
                />
            </div>
            <button
                onClick={capture}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition transform hover:scale-105"
            >
                {buttonText}
            </button>
        </div>
    );
};
