import { useCallback, useEffect, useReducer, useRef } from "react";
import { shoppingReducer, cameraOptions } from "../reducers/shoppingReducer";
import Webcam from "react-webcam";
import toast from "react-hot-toast";

export default function useShoppingCamera() {
    const webcamRef = useRef<Webcam>(null);
    const [state, dispatch] = useReducer(shoppingReducer, cameraOptions);

    console.log(state)

    const checkCamera = useCallback(async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            dispatch({ type: 'SET_HAS_CAMERA', payload: videoDevices.length > 0 })
            if (videoDevices.length <= 0) {
                dispatch({ type: 'SET_CAMERA_STREAM', payload: null })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: 'SET_HAS_CAMERA', payload: false })
        }
    }, [])

    useEffect(() => {
        checkCamera();
        navigator.mediaDevices.addEventListener("devicechange", checkCamera);

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", checkCamera);
            if (state.cameraStream) {
                state.cameraStream.getTracks().forEach((track) => track.stop());
                dispatch({ type: "SET_CAMERA_STREAM", payload: null });
            }
        };
    }, [checkCamera])

    const handleCameraToggle = async () => {
        if (!state.hasCamera) {
            await checkCamera();
            toast('No Camera found')
        }

        if (state.hasCamera) {
            if (state.cameraStream) {
                state.cameraStream.getTracks().forEach((track) => track.stop());
                dispatch({ type: "SET_CAMERA_STREAM", payload: null });
            } else {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    dispatch({ type: "SET_CAMERA_STREAM", payload: stream });
                } catch (error) {
                    console.error("Error accessing camera:", error);
                }
            }
        }
    };

    const handleCameraCapture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch({ type: 'SET_CAPTURE_IMAGE', payload: imageSrc || '' })
        }
    }, [webcamRef]);

    return {
        state,
        dispatch,
        handleCameraToggle,
        handleCameraCapture,
        webcamRef
    };
}