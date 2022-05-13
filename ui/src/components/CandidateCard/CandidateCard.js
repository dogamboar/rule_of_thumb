import "./styles.css"
import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";


import VotingButtons from "../VotingButtons/VotingButtons";
import VotingResult from "../VotingResult/VotingResult";
import { ThumbWrapper } from "../Thumb/Thumb";

const CandidateCard = ({id, name, description, image, lastUpdated, category, viewMode}) => {

    const [alreadyVoted, setAlreadyVote] = useState(false);
    const [votingResult, setVotingResult] = useState({total: 0, positives: 0, negatives: 0});

    useEffect( () => {
        fetch(`/vote/${id}`)
            .then(response => response.json())
            .then(data => setVotingResult(data));   
    }, [alreadyVoted, id, setVotingResult]);

    const isWinning = votingResult.yes > votingResult.no

    const candidateCss = ['candidate', `candidate--${viewMode}`]
    const candidateInfoCss = ['candidate-info', `candidate-info--${viewMode}`]

    const backgroundImageStyle = [];
    if (viewMode === 'list'){
        backgroundImageStyle.push(`linear-gradient(to right, 
            rgba(0, 0, 0, 0.0001) 50px, 
            rgb(136, 136, 136,0.6) 100px,
            rgb(136, 136, 136,0.9) 120px, 
            rgb(136, 136, 136) 130px, 
            #666666 60%,
            rgba(51, 51, 51, 0.6) 71.88%)`)
    }
    backgroundImageStyle.push(`url(${image})`)

    const time = DateTime.fromISO(lastUpdated).toRelativeCalendar();
    const timeInTheField = `${time} in ${category}`;

    return (
        <div className={candidateCss.join(' ')} style={{backgroundImage: backgroundImageStyle.join(', ')}}>
            <div className={candidateInfoCss.join(' ')}>
                { (viewMode==='grid')
                    ?
                    <React.Fragment>
                        <div className="candidate-info__heading">
                            <ThumbWrapper towardsDown={!isWinning} />
                            <div className="candidate-info__heading-title">{name}</div>
                        </div>
                        <div className="candidate-info__container candidate-info__container--grid">
                            <p className="candidate-info__description">{description}</p>
                            <VotingButtons 
                                alreadyVoted={alreadyVoted} 
                                votedCb={setAlreadyVote}
                                idCandidate={id}
                                timeInTheField={timeInTheField}
                            />
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div>
                            <ThumbWrapper towardsDown={!isWinning} />
                        </div>
                        <div className="candidate-info__container candidate-info__container--list">
                            <div className="candidate-info__heading-title candidate-info__heading-title--list">{name}</div>
                            <p className="candidate-info__description candidate-info__description--list">{description}</p>
                        </div>
                        <VotingButtons 
                            alreadyVoted={alreadyVoted} 
                            votedCb={setAlreadyVote}
                            idCandidate={id}
                            timeInTheField={timeInTheField}
                        />
                    </React.Fragment>
                }
            </div>
            <VotingResult 
                yes={votingResult.yes}
                no={votingResult.no}
                total={votingResult.total} /
            >
        </div>
    );
}

export default CandidateCard;