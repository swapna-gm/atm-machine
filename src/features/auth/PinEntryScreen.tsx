import { useNavigate } from 'react-router-dom';
import { useATMApp } from '../../context/ATMAppContext';
import { authService } from '../../services/authService';
import ATMFrame from '../../components/ATMFrame';
import { useState } from 'react';

export default function PinEntryScreen() {
  const [input, setInput] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useATMApp()!;
  const navigate = useNavigate();

  // Button configurations
  const leftButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Exit', ariaLabel: 'Exit', onClick: () => navigate('/') },
  ];
  const rightButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'ENTER', ariaLabel: 'Enter PIN', onClick: () => !loading && handleSubmit() },
  ];
  // handler for pin submission
  async function handleSubmit() {
    setLocalError(null);
    if (!input || input.length !== 4) {
      setLocalError('Enter a 4-digit PIN');
      return;
    }
    setLoading(true);
    try {
      await authService.validatePin(input);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          enteredPin: input,
          cardType: 'Amex',
          customerName: 'Swapna',
        },
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (e: any) {
      setLoading(false);
      setLocalError(e.message || 'PIN validation failed');
      setInput('');
    }
  }

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <div
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4] shadow-inner font-retro text-white flex flex-col justify-between relative"
        style={{ fontSize: 16, lineHeight: '28px' }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!loading) handleSubmit();
          }}
          className="flex-1 flex flex-col px-3 py-4"
        >
          <div className="text-center mb-4">
            <span className="font-retro tracking-wide">
              Enter your PIN
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <input
              type="password"
              value={input}
              maxLength={4}
              autoFocus
              onChange={e => setInput(e.target.value.replace(/\D/, '').slice(0, 4))}
              className="w-24 text-black text-center font-retro rounded px-2 py-1 text-lg outline-none"
              placeholder="••••"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-retro tracking-widest disabled:opacity-70"
              disabled={loading}
            >
              Enter
            </button>
          </div>
          {localError && (
            <div className="text-red-500 text-xs font-retro mt-2 text-center">
              {localError}
            </div>
          )}
        </form>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </ATMFrame>
  );
}
