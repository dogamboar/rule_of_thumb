import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import CandidateCard from '../CandidateCard/CandidateCard';
import "./styles.css"

const viewOptions = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
];

const viewOptionDefaultValue = { value: 'grid', label: 'Grid' };

function CandidatesList() {

    const [candidates, setCandidates] = useState([]);
    const [isMobile, setIsMobile] = useState(true);

    const [viewMode, setViewMode] = useState(viewOptionDefaultValue);

    useEffect( () => {
        fetch('/candidates/list')
            .then(response => response.json())
            .then(data => setCandidates(data));   
    }, []);

    useEffect(() => {
        // Handler to call on window resize
        function checkWindowSize() {
            setIsMobile(window.innerWidth < 768);
        }
        // Add event listener
        window.addEventListener("resize", checkWindowSize);
        checkWindowSize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkWindowSize);
    }, [setIsMobile]);

    useEffect( () => {
        if (isMobile) {
            setViewMode(viewOptionDefaultValue);
        }
    }, [isMobile]);


    const classCandidates = ['candidates', `candidates--${viewMode.value}`];
    const classCandidatesItem = ['candidate-item', `candidate-item--${viewMode.value}`];

    return (
        <React.Fragment>
            <div className='candidates-section__heading'>
                <h2 className='candidates-section__title'>{`Previous Rulings`}</h2>
                {!isMobile &&
                    <Select
                        className='view-mode__list'
                        defaultValue={viewMode}
                        onChange={setViewMode}
                        options={viewOptions}
                    />
                }
            </div>
            <div className='candidates-section-content'>
                <ul className={classCandidates.join(' ')}>
                    {candidates.map((item, index) => (
                        <li className={classCandidatesItem.join(" ")} key={index}>
                            <CandidateCard
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                lastUpdated={item.lastUpdated}
                                category={item.category}
                                viewMode={viewMode.value}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default CandidatesList;