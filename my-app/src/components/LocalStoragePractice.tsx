import React, {useEffect, useState} from 'react';

export const LocalStoragePractice = () => {

    const [value, setValue] = useState(0)



    useEffect(()=>{
        const valueToString = localStorage.getItem('valueCount')
        if(valueToString){
            let newValue = JSON.parse(valueToString)
            setValue(newValue)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('valueCount', JSON.stringify(value))
    },[value])
    const incHandler = () => {
        setValue(value + 1)
    }

    const removeLocal = () => {
        localStorage.clear()
    }



    return (
        <div>
       <h1 style={{color: 'red'}}>{value}</h1>
            <button onClick={incHandler}>inc</button>
            <button onClick={removeLocal}> +</button>
        </div>
    );
};

