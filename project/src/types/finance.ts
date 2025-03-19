export type TransactionCategory = 
  | 'salary'
  | 'freelance'
  | 'allowance'
  | 'rent'
  | 'groceries'
  | 'utilities'
  | 'entertainment'
  | 'education'
  | 'transportation'
  | 'other';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string;
  type: TransactionType;
}

export type Period = 'week' | 'month' | 'year';

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryBreakdown: Record<TransactionCategory, number>;
}