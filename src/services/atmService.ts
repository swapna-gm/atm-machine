const BALANCE_KEY = 'atm_balance';
const DEFAULT_BALANCE = 99;

// get user balance
const getStoredBalance = (): number => {
  const stored = localStorage.getItem(BALANCE_KEY);
  return stored ? parseFloat(stored) : DEFAULT_BALANCE;
};

// save user balance
const saveBalance = (balance: number) => {
  localStorage.setItem(BALANCE_KEY, balance.toString());
};

// service : get balance, deposit, withdraw and reset
export const atmService = {
  getBalance(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balance = getStoredBalance();
        resolve(balance);
      }, 300);
    });
  },

  deposit(amount: number): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          return reject('Enter a valid amount');
        }
        const current = getStoredBalance();
        const newBalance = current + amount;
        saveBalance(newBalance);
        resolve(newBalance);
      }, 300);
    });
  },

  withdraw(amount: number): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const current = getStoredBalance();
        if (amount <= 0) return reject('Enter a valid amount');
        if (amount > current) return reject('Insufficient Funds');
        const newBalance = current - amount;
        saveBalance(newBalance);
        resolve(newBalance);
      }, 300);
    });
  },

  reset(): void {
    saveBalance(DEFAULT_BALANCE);
  },
};
