import React, {useEffect, useState} from 'react';
import s from "./ScreenWithResults.module.css";
import {AppRootStateType} from "../state/store";
import {useDispatch, useSelector} from "react-redux";
import {UniversalButton} from "./UniversalButton";


export const INCREMENT = 'INCREMENT'
export const RESET = 'RESET'
export const SETTINGS_RENDER = 'SETTINGS_RENDER'

export const ScreenWithResultsMemo = React.memo(function ScreenWithResults(){
    const [show, setShow] = useState('Enter values and press "set"')
    const [render, setRender] =  useState(true)


    const dispatch = useDispatch()
    const count = useSelector<AppRootStateType, number | undefined>(state => state.counter.count)
    const maxValue = useSelector<AppRootStateType, number>(state => state.counter.maxValue)
    const onInputValue = useSelector<AppRootStateType, number | undefined>(state => state.counter.onInputValue)

    const incrementFunc = () => {
        dispatch({type: INCREMENT})
    }

    const resetFunc = () => {
        dispatch({type: RESET})
    }

    const getStyleForCount = () => {
        if (show !== 'Incorrect value!' && show !== 'Enter values and press "set"' && maxValue === count) {
            return s.finalNumericValue
        }
        if (show !== 'Incorrect value!' && show !== 'Enter values and press "set"' && maxValue !== count) {
            return s.resultNumValueStyle
        }
    }

    useEffect(() => {
        if (count || count === 0) {
            setShow(count.toString())
        }

    }, [count])


    const incDisabled = !!count && maxValue <= count || count === undefined || maxValue === onInputValue;
    const resetDisabled = (count === onInputValue) || (onInputValue !== undefined && onInputValue > maxValue) || maxValue === onInputValue;

    const settingsRender = () => {
        dispatch({type: SETTINGS_RENDER, flag: render})
    }

    return (
        <div className={s.ScreenWithResults}>
            <div className={s.firstContainer}>
                <div className={getStyleForCount()}>{count}</div>
            </div>
            <div className={s.secondContainer}>
                <UniversalButton name={'inc'} callback={incrementFunc} disabled={incDisabled}/>
                <UniversalButton name={'reset'} callback={resetFunc} disabled={resetDisabled}/>
                <UniversalButton disabled={false} name={'set'} callback={settingsRender}/>
            </div>
        </div>
    );
});

