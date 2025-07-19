import { useATMApp } from '../../context/ATMAppContext';
import { useNavigate } from 'react-router-dom';
import ATMFrame from '../../components/ATMFrame';
import { useEffect, useState } from 'react';
import { atmService } from '../../services/atmService';
import { useAutoLogoff } from '../../hooks/useAutoLogoff';

export default function DashboardScreen() {
  const { state, dispatch } = useATMApp()!;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useAutoLogoff(90000);

  // Button configurations
  const leftButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Deposit  ', ariaLabel: 'Deposit', onClick: () => navigate('/deposit') },
    { enabled: true, text: 'Withdraw', ariaLabel: 'Withdraw', onClick: () => navigate('/withdraw') }

  ];
  const rightButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Check Balance', ariaLabel: 'Check Balance', onClick: () => navigate('/balance') },
    { enabled: true, text: 'Exit', ariaLabel: 'Exit', onClick: () => navigate('/') },
  ];

  // fetch balance
  useEffect(() => {
    setLoading(true);
    atmService.getBalance()
      .then((bal) => {
        dispatch({ type: 'SET_BALANCE', payload: bal });
        setLoading(false);
      })
      .catch(() => {
        setError('Could not fetch balance');
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <div
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4] shadow-inner font-retro text-white flex flex-col px-5 py-3"
        style={{ fontSize: 16, lineHeight: '26px' }}
      >
        <div>
          <div className="font-retro mb-1">Welcome, {state.customerName || "Guest"}</div>
          <div className="font-retro mb-1">Card: {state.cardType || "Visa"}</div>
          <div className="font-retro text-xs mb-2 mt-8">Your Current Balance</div>
          {loading ? (
            <div className="font-retro text-center text-lg mt-2">Loading...</div>
          ) : error ? (
            <div className="font-retro text-center text-red-400 text-lg mt-2">{error}</div>
          ) : (
            <div className="font-retro text-2xl font-bold tracking-widest text-center mb-1">
              ${state.balance?.toFixed(2) ?? '0.00'}
            </div>
          )}
        </div>
      </div>
    </ATMFrame>
  );
}
