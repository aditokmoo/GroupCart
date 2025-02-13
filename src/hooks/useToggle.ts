import { useReducer, useCallback } from "react";

type State = Record<string, boolean>;

type Action =
    | { type: "TOGGLE"; key: string }
    | { type: "CLOSE"; key: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "TOGGLE":
            return { ...state, [action.key]: !state[action.key] };
        case "CLOSE":
            return { ...state, [action.key]: false };
        default:
            return state;
    }
}

export default function useToggle() {
    const [isActive, dispatch] = useReducer(reducer, {});

    const toggle = useCallback((key: string) => {
        dispatch({ type: "TOGGLE", key });
    }, []);

    const close = useCallback((key: string) => {
        dispatch({ type: "CLOSE", key });
    }, []);

    return { isActive, toggle, close };
}