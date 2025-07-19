import { useNavigate } from 'react-router-dom';
import { atmService } from '../../services/atmService';
import { useATMApp } from '../../context/ATMAppContext';
import ATMFrame from '../../components/ATMFrame';
import { useState } from 'react';
import { useAutoLogoff } from '../../hooks/useAutoLogoff';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { dispatch } = useATMApp()!;
  const navigate = useNavigate();
  useAutoLogoff(90000);

  /// Button configurations
  const leftButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: "Cancel", ariaLabel: 'Cancel', onClick: () => navigate('/dashboard') },
  ];
  const rightButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: "Deposit", ariaLabel: 'Deposit', onClick: () => handleDeposit() },
  ];
  // handler for deposit
  async function handleDeposit() {
    setLocalError(null);
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setLocalError('Enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      const newBal = await atmService.deposit(numAmount);
      dispatch({ type: 'SET_BALANCE', payload: newBal });
      setLoading(false);
      navigate('/success', { replace: true });
    } catch (e: any) {
      setLoading(false);
      setLocalError(e || 'Deposit failed');
      setAmount('');
    }
  }

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <section
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4]
          shadow-inner font-retro text-white flex flex-col justify-start relative px-6 py-3"
      >
        <div className="font-retro text-lg mb-3 text-center">Deposit Funds</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!loading) handleDeposit();
          }}
          className="flex flex-col items-center gap-2"
        >
          <input
            type="number"
            min={1}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-60 text-black text-center font-retro rounded px-2 py-1 text-sm outline-none mb-2"
            disabled={loading}
          />
          {localError && (
            <div className="text-red-300 text-xs font-retro mt-1 text-center">
              {localError}
            </div>
          )}
        </form>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </section>
    </ATMFrame>
  );
}

