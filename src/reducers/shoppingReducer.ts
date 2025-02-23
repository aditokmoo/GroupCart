export interface CameraOptionTypes {
    facingMode: "user" | "environment";
    capturedImage: string | null,
    hasCamera: boolean,
    cameraStream: MediaStream | null
}

export type CameraActionTypes =
    | { type: 'SET_FACING_MODE', payload: 'user' | 'environment' }
    | { type: 'SET_CAPTURE_IMAGE', payload: string | null }
    | { type: "SET_HAS_CAMERA", payload: boolean }
    | { type: "SET_CAMERA_STREAM", payload: MediaStream | null }

export const cameraOptions: CameraOptionTypes = {
    facingMode: 'environment',
    capturedImage: null,
    hasCamera: false,
    cameraStream: null
}

export const shoppingReducer = (state: CameraOptionTypes, action: CameraActionTypes): CameraOptionTypes => {
    switch (action.type) {
        case 'SET_FACING_MODE':
            return { ...state, facingMode: action.payload }
        case 'SET_CAPTURE_IMAGE':
            return { ...state, capturedImage: action.payload }
        case "SET_HAS_CAMERA":
            return { ...state, hasCamera: action.payload }
        case "SET_CAMERA_STREAM":
            return { ...state, cameraStream: action.payload }
        default:
            return state;
    }
}