import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionList = this.transactions;

    const income = transactionList
      .filter(transaction => transaction.type === 'income')
      .reduce((acm, cm) => acm + cm.value, 0);

    const outcome = transactionList
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acm, cm) => acm + cm.value, 0);

    const total = income - outcome;

    const balance : Balance = {
        income: income,
        outcome: outcome,
        total: total
    };

    return balance;
  }

  public create({ title, value, type} : CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
