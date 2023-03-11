import React  from 'react';
import './App.css';
import {ScreenWithSettingsMemo} from "./components/ScreenWithSettings";
import {ScreenWithResultsMemo} from "./components/ScreenWithResults";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";



function App() {

const flag = useSelector<AppRootStateType, boolean>(state => state.counter.settingsRender)

    if (flag){
        return (
            <div className="App">
                <ScreenWithSettingsMemo/>
            </div>
        )
    } else{
        console.log(flag)
        return (
            <div className="App">
                <ScreenWithResultsMemo/>
            </div>
        )
    }
}

export default App;
