import { useATMApp } from '../../context/ATMAppContext';
import { useNavigate } from 'react-router-dom';
import ATMFrame from '../../components/ATMFrame';
import { useAutoLogoff } from '../../hooks/useAutoLogoff';

export default function BalanceScreen() {
  const { state } = useATMApp()!;
  const navigate = useNavigate();
  useAutoLogoff(90000);

  // Button configurations
  const leftButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Back', ariaLabel: 'Back', onClick: () => navigate('/dashboard') },
  ];
  const rightButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Exit', ariaLabel: 'Exit', onClick: () => navigate('/') },
  ];

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <section
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4]
          shadow-inner font-retro text-white flex flex-col justify-between relative px-6 py-3"
      >
        <div className="font-retro text-lg mb-3 text-center">
          Your Current Balance
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="font-retro text-3xl font-bold tracking-widest">
            ${state.balance?.toFixed(2) ?? '0.00'}
          </span>
        </div>
      </section>
    </ATMFrame>
  );
}

