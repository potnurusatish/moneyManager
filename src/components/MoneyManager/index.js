import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    totalIncome: 0,
    totalExpenses: 0,
    title: '',
    amount: '',
    transactionType: transactionTypeOptions[0].displayText,
    transactionsList: [],
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const deletedTransaction = transactionsList.filter(
      eachTransaction => eachTransaction.id === id,
    )
    console.log(deletedTransaction)
    console.log(deletedTransaction[0].amount)
    const filteredTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    if (deletedTransaction.transactionType === 'Income') {
      this.setState(prevState => ({
        transactionsList: filteredTransactionsList,
        totalIncome:
          parseInt(prevState.totalIncome) -
          parseInt(deletedTransaction[0].amount),
      }))
    } else {
      this.setState(prevState => ({
        transactionsList: filteredTransactionsList,
        totalExpenses:
          parseInt(prevState.totalExpenses) -
          parseInt(deletedTransaction[0].amount),
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, transactionType} = this.state
    console.log(transactionType)

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      transactionType,
    }

    if (transactionType === 'Income') {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        totalIncome: prevState.totalIncome + parseInt(amount),
        title: '',
        amount: '',
        transactionType: transactionTypeOptions[0].displayText,
      }))
    } else {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        totalExpenses: prevState.totalExpenses + parseInt(amount),
        title: '',
        amount: '',
        transactionType: transactionTypeOptions[0].displayText,
      }))
    }
  }

  render() {
    const {
      totalIncome,
      totalExpenses,
      title,
      amount,
      transactionType,
      transactionsList,
    } = this.state
    console.log(transactionsList)
    console.log(totalIncome, totalExpenses)

    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails totalIncome={totalIncome} totalExpenses={totalExpenses} />
        <div>
          <div>
            <h1>Add Transaction</h1>
            <form onSubmit={this.onAddTransaction}>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={this.onChangeTitle}
                placeholder="TITLE"
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={this.onChangeAmount}
                placeholder="AMOUNT"
              />
              <label htmlFor="type">TYPE</label>
              <select
                id="type"
                value={transactionType}
                onChange={this.onChangeTransactionType}
              >
                {transactionTypeOptions.map(eachType => (
                  <option key={eachType.optionId} value={eachType.displayText}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div>
            <h1>History</h1>
            <div>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
