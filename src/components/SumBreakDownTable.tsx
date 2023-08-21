import React from 'react';
import '../css/missionDataContent.css';
import ExpandableTable from './ExpandableTable';

interface ISumBreakDownTableProps {
    totalSum: number,
    array: [string, string | number][],
    includePercentage: boolean
}

const SumBreakDownTable: React.FC<ISumBreakDownTableProps> = ({ totalSum, array, includePercentage = false }) => {
    return (
        <ExpandableTable
            header={
                <tr className='sum-breakdown-table-total clickable'>
                    <td>Total</td>
                    <td>{totalSum}</td>
                </tr>
            }

            content={
                array.sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]: [string, string | number]) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{typeof value === 'number' ? Math.trunc(value) : value}</td>
                            {includePercentage && <td className='percentage'>({((Number(value) / totalSum * 100).toFixed(2))}%)</td>}
                        </tr>
                    );
                })
            }
        />
    )
}

export default SumBreakDownTable;