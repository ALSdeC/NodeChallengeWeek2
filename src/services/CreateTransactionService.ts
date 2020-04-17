import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type} : Request): Transaction {

    if(type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      const NoLimit = (balance.total - value) < 0;

      if(NoLimit) {
        throw Error('No valid balance for this outcome transaction');
      }
    }

    const appointment = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return appointment;
  }
}

export default CreateTransactionService;
