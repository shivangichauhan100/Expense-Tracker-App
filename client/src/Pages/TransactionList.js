import React, { useContext } from 'react'; // Import useContext
import Transaction from './Transaction'; // Adjusted import to be default export
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
    const { transactions } = useContext(GlobalContext);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
    );
}

export default TransactionList;
