import React, { useState, useEffect } from 'react';
import {ReactComponent as ThumbSvg} from './assets/thumb.svg'
import "./styles.css"

function Thumb({towardsDown}) {

    const thumbsClass = ['thumb-icon']
    
    if (towardsDown){
        thumbsClass.push('thumb-icon__down')
    } else {
        thumbsClass.push('thumb-icon__up')
    }

    return (
        <ThumbSvg className={thumbsClass.join(' ')} />
    );
}

function ThumbButton({setVoteCb, selectedVote, towardsDown}) {

    const [selected, setSelected] = useState(false);

    useEffect( () => {
        setSelected(selectedVote === !towardsDown) 
    }, [selectedVote, towardsDown]);

    const buttonClass = ['wrapper-thumb', 'thumb-button']
    const value = (!towardsDown)

    if (towardsDown){
        buttonClass.push('wrapper-thumb__down')
    } else {
        buttonClass.push('wrapper-thumb__up')
    }

    const setVote = (voteValue) => {
        if (typeof setVoteCb === 'function'){
            setVoteCb(voteValue)
        }
    }

    const pressButton = () => {
        if (selected) {
            return setVote(null)
        }
        setVote(value)
    }

    if (selected === true) {
        buttonClass.push('thumb-button__active')
    }

    return (
        <button className={buttonClass.join(' ')} onClick={pressButton}>
            <Thumb towardsDown={towardsDown} />
        </button>
    );
}

function ThumbWrapper({towardsDown}) {

    const buttonClass = ['wrapper-thumb']

    if (towardsDown){
        buttonClass.push('wrapper-thumb__down')
    } else {
        buttonClass.push('wrapper-thumb__up')
    }

    return (
        <div className={buttonClass.join(' ')}>
            <Thumb towardsDown={towardsDown} />
        </div>
    );
}

export default ThumbWrapper;

export {Thumb, ThumbButton, ThumbWrapper};