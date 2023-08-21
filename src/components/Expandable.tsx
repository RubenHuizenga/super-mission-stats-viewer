import React, { useState } from 'react';
import "../css/expandable.css"

interface IExpandableProps {
    header: JSX.Element;
    content: JSX.Element | JSX.Element[];
}

const Expandable: React.FC<IExpandableProps> = ({ header, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsExpanded(!isExpanded);
        event.stopPropagation()
    };

    return (
        <React.Fragment>
            <section className={`expandable-header ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
                {header}
            </section>
            <section className='expandable-content'>
                {isExpanded && content}
            </section>
        </React.Fragment >
    );
};

export default Expandable;