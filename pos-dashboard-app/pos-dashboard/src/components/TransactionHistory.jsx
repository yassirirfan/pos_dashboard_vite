 // components/TransactionHistory.jsx
  export default function TransactionHistory({ transactions }) {
    if (!transactions || transactions.length === 0) {
      return <div className="no-transactions">No transactions found</div>;
    }
    
    return (
      <div className="transaction-table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              {/* <th>Date</th> */}
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.pos_order_id[1]}</td>
                {/* <td>{new Date(transaction.date).toLocaleString()}</td> */}
                <td className="amount">
                  ${parseFloat(transaction.amount).toFixed(2)}
                </td>
                <td>{transaction.payment_method_id[1]}</td>
                <td>Done</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }