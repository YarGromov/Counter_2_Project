import React, {FormEvent, useEffect, useState} from 'react';
import s from './ScreenWithSettings.module.css'
import {useDispatch, useSelector} from "react-redux";
import {UniversalButton} from "./UniversalButton";
import {AppRootStateType} from "../state/store";
import {SETTINGS_RENDER} from "./ScreenWithResults";


export const SET_VALUE = 'SET_VALUE';
export const MAX_VALUE = 'MAX_VALUE';
export const ON_INPUT_VALUE = 'ON_INPUT_VALUE';

export const ScreenWithSettingsMemo = React.memo(function ScreenWithSettings() {
    const [maxValue, setMaxValue] = useState<number>(0)
    const [onInputValue, setOnInputValue] = useState<number>(0)

    const maxValueFromReducer = useSelector<AppRootStateType, number>(state => state.counter.maxValue)
    const onInputValueFromReducer = useSelector<AppRootStateType, number | undefined>(state => state.counter.onInputValue)
    const flag = useSelector<AppRootStateType, boolean>(state => state.counter.settingsRender)

    const dispatch = useDispatch();



    const maxValueInputStyles = () => {
        if (maxValue < 0) {
            return s.incorrectFirstContainer
        }
        if ((maxValue !== 0 && onInputValue !== 0) && maxValue === onInputValue) {
            return s.incorrectFirstContainer
        }
        if ((maxValue < onInputValue) && maxValue === 0) {
            return s.incorrectFirstContainer
        }
        if (onInputValue > maxValue) {
            return s.incorrectFirstContainer
        }
    }

    const startValueInputStyles = () => {
        if (onInputValue < 0) {
            return s.incorrectFirstContainer
        }
        if ((maxValue !== 0 && onInputValue !== 0) && maxValue === onInputValue) {
            return s.incorrectFirstContainer
        }
        if (maxValue > 0 && onInputValue > maxValue) {
            return s.incorrectFirstContainer
        }
        if ((maxValue === 0) && onInputValue > maxValue) {
            return s.incorrectFirstContainer
        }
    }

    const maxValueInput = (e: FormEvent<HTMLInputElement>) => {
        setMaxValue(+e.currentTarget.value)
        dispatch({type: MAX_VALUE, payload: +e.currentTarget.value})
    }

    const setClick = () => {
        dispatch({type: SET_VALUE, payload: onInputValue})
        dispatch({type: MAX_VALUE, payload: maxValue})
        dispatch({type: SETTINGS_RENDER, flag: !flag})
    }

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        setOnInputValue(+e.currentTarget.value)
        dispatch({type: ON_INPUT_VALUE, payload: +e.currentTarget.value})
    }

    const setDisabled = onInputValue < 0 || onInputValue >= maxValue;

    useEffect(() => {
        if (maxValueFromReducer) {
            setMaxValue(maxValueFromReducer)
        }
        if (onInputValueFromReducer) {
            setOnInputValue(onInputValueFromReducer)
        }
    }, [maxValueFromReducer, onInputValueFromReducer])

    return (
        <div className={s.ScreenWithSettings}>
            <div className={s.firstContainer}>
                <div className={maxValueInputStyles()}>max value: <input value={maxValue} onInput={maxValueInput}
                                                                         type="number"/></div>
                <div className={startValueInputStyles()}>start value: <input value={onInputValue} onInput={onInput}
                                                                             type="number"/></div>
            </div>
            <div className={s.secondContainer}>
                <UniversalButton disabled={setDisabled} name={'set'} callback={setClick}/>
            </div>
        </div>
    );
});
