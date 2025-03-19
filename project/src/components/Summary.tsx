import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Transaction, TransactionCategory } from '../types/finance';

interface SummaryProps {
  transactions: Transaction[];
}

export function Summary({ transactions }: SummaryProps) {
  const summary = React.useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const categoryBreakdown = transactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {} as Record<TransactionCategory, number>);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categoryBreakdown
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-lg font-semibold text-gray-900">${summary.totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-lg font-semibold text-gray-900">${summary.totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Current Balance</p>
            <p className="text-lg font-semibold text-gray-900">${summary.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}