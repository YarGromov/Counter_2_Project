import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {reducer} from "./reducer";
import {loadState, saveState} from "../utils/localStorage-utils";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    counter: reducer
})


export const store = legacy_createStore(rootReducer,loadState(), applyMiddleware(thunk))

store.subscribe(()=>{
    saveState({
        counter: store.getState().counter
    })
})

export type AppRootStateType = ReturnType<typeof rootReducer>