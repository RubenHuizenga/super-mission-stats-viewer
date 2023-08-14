import React, { useState } from 'react';
import "../css/expandable.css"

interface ExpandableProps {
    header: JSX.Element;
    content: JSX.Element;
}

const Expandable: React.FC<ExpandableProps> = ({ header, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsExpanded(!isExpanded);
        event.stopPropagation()
    };

    return (
        <section className={`expandable ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand} >
            {header}
            {isExpanded && content}
        </section>
    );
};

export default Expandable;