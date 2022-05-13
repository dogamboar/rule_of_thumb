import React, { useState } from 'react';
import './styles.css'
import { ThumbButton } from '../Thumb/Thumb';

const VotingButtons = ({idCandidate, timeInTheField, alreadyVoted, votedCb}) => {

    const [vote, setVote] = useState();

    const voteAgain = () => {
        votedCb(false)
        setVote(null)
    }

    const postVote = async (voteToSend) => {
        await fetch(`vote/${idCandidate}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({vote: voteToSend})
        });
    };

    const submitVote = async() => {
        await postVote(vote);
        votedCb(true)
    }

    return (    
        <div className='voting-wrapper'>
            { ! alreadyVoted 
                ?
                <React.Fragment>
                    <p className="voting-wrapper__info">{timeInTheField}</p>
                    <div className='voting-wrapper__buttons'>
                        <ThumbButton towardsDown={false} selectedVote={vote} setVoteCb={setVote} />
                        <ThumbButton towardsDown={true} selectedVote={vote} setVoteCb={setVote} />
                        <button className='vote-submit' disabled={(vote) == null} onClick={submitVote}>Vote Now</button>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <p className="voting-wrapper__info">{`Thank you for your vote!`}</p>
                    <div className='voting-wrapper__buttons'>
                        <button className='vote-submit' onClick={voteAgain}>Vote again</button>
                    </div>
                </React.Fragment>
            }
            <div>
            </div>
        </div>
    )

}
export default VotingButtons;