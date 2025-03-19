import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction, TransactionCategory, TransactionType } from '../types/finance';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState<TransactionCategory>('other');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = React.useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !date) return;
    
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date,
      type
    });

    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {type === 'income' ? (
              <>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="allowance">Allowance</option>
                <option value="other">Other</option>
              </>
            ) : (
              <>
                <option value="rent">Rent</option>
                <option value="groceries">Groceries</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="transportation">Transportation</option>
                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Transaction
      </button>
    </form>
  );
}