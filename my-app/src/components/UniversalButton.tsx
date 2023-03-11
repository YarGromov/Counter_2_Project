import React from 'react';

type ButtonType = {
    name: string
    callback: () => void
    disabled: boolean
}

export const UniversalButton = (props: ButtonType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        <div>
            <button disabled={props.disabled} onClick={onClickHandler}>{props.name}</button>
        </div>
    );
};

