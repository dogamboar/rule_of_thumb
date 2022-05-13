import React from 'react';
import './styles.css'
import { Thumb } from '../Thumb/Thumb';

const VotingResult = ({yes, no, total}) => {

    let yesAverage = 0;
    let noAverage = 0;
    if (total > 0){
        yesAverage = Math.round(((yes*100)/total) * 10) / 10;
        noAverage = Math.round(((no*100)/total) * 10) / 10;
    }

    const yesBarStyle = {
        width : `${yesAverage}%`
    }

    const noBarStyle = {
        width : `${noAverage}%`
    }

    return (
        <div className='voting-result__container'>
            <div className="progress-bar">
                <div className="progress-bar progress-bar__yes" style={yesBarStyle}></div>
                <div className="progress-bar progress-bar__no" style={noBarStyle}></div>
            </div>
            <div className='voting-result'>
                <div className='voting-result__value'>
                    <Thumb /><span className="voting-result__yes-total">{`${yesAverage} %`}</span>
                </div>
                <div className='voting-result__value'>
                    <span className="voting-result__no-total">{`${noAverage} %`}</span><Thumb towardsDown={true} />
                </div>
            </div>
        </div>
    );
}
 
export default VotingResult;