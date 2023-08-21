import React, { useState } from 'react';
import "../css/expandable.css"

interface IExpandableTableProps {
    header: JSX.Element;
    content: JSX.Element | JSX.Element[];
}

const ExpandableTable: React.FC<IExpandableTableProps> = ({ header, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (event: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
        setIsExpanded(!isExpanded);
        event.stopPropagation()
    };

    return (
        <table>
            <tbody className={`expandable-header ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
                {header}
            </tbody>
            <tbody className='expandable-content'>
                {isExpanded && content}
            </tbody>
        </table >
    );
};

export default ExpandableTable;