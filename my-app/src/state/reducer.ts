export type CountStateType = {
    count: number | undefined
    maxValue: number
    onInputValue: number | undefined
    settingsRender: boolean
}

const defaultState: CountStateType = {
    count: undefined,
    maxValue: 0,
    onInputValue: undefined,
    settingsRender: true
}

export type ReducerActionType = {
    type: "INCREMENT" | "RESET" | "SET_VALUE" | "MAX_VALUE" | "INPUT_VALUE" | "ON_INPUT_VALUE" | "SETTINGS_RENDER"
    payload: number
    flag: boolean
}

export const reducer = (state = defaultState, action: ReducerActionType): CountStateType => {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, count: (state.count || state.count === 0) ? state.count + 1 : state.count};
        case 'RESET':
            return {...state, count: state.onInputValue};
        case 'SET_VALUE':
            return {...state, onInputValue: action.payload, count: action.payload};
        case 'MAX_VALUE':
            return {...state, maxValue: action.payload};
        case 'ON_INPUT_VALUE':
            return {...state, onInputValue: action.payload};
        case 'SETTINGS_RENDER':
            return {...state, settingsRender: action.flag};
        default:
            return state;
    }
}
