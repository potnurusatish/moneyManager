import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, transactionType} = transactionDetails

  const onClickDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <p>{amount}</p>
        <p>{transactionType}</p>
        <button onClick={onClickDeleteTransaction} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
