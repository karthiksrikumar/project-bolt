import React from 'react';
import { Transaction } from './types/finance';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';

function App() {
  const [transactions, setTransactions] = React.useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);

  React.useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID()
    };
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = (updatedTransaction: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    setTransactions(prev =>
      prev.map(t =>
        t.id === editingTransaction.id
          ? { ...updatedTransaction, id: t.id }
          : t
      )
    );
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Finance Tracker</h1>
          
          <Summary transactions={transactions} />
          
          {editingTransaction ? (
            <TransactionForm
              onSubmit={handleUpdateTransaction}
              initialTransaction={editingTransaction}
            />
          ) : (
            <TransactionForm onSubmit={handleAddTransaction} />
          )}
          
          <div className="mt-8">
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;