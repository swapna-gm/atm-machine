import { useNavigate } from 'react-router-dom';
import ATMFrame from '../../components/ATMFrame';
import { useATMApp } from '../../context/ATMAppContext';
import { useEffect } from 'react';
import { useAutoLogoff } from '../../hooks/useAutoLogoff';

export default function TransactionSuccessScreen() {
  const navigate = useNavigate();
  const { state } = useATMApp()!;
  useAutoLogoff(90000);

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
    { enabled: true, text: 'Continue', ariaLabel: 'Continue', onClick: () => navigate('/dashboard') },
  ];

  // Block/redirect browser back navigation
  useEffect(() => {
    if (location.pathname !== '/success') {
      navigate('/success', { replace: true });
    } else {
      window.history.pushState(null, '', '/success');
      window.history.replaceState(null, '', '/success');
    }
    const handlePopState = () => {
      navigate('/success', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate, location]);

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <section
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4]
          shadow-inner font-retro text-white flex flex-col justify-start items-center relative px-5 py-3"
        style={{ fontSize: 20, lineHeight: '28px' }}
      >
        <div className="flex flex-col items-center justify-start">
          <span className="font-retro text-xl mb-3">Transaction</span>
          <span className="font-retro text-2xl font-bold mb-3 text-green-200">Successful!</span>
          <span className="font-retro text-base text-center text-white/80">Thank you for banking with us</span>
        </div>
        <div className="flex flex-col justify-center items-center w-full pt-8">
          <div className="font-retro text-xs mb-2 ">Your Current Balance</div>
          <span className="font-retro text-3xl font-bold tracking-widest">
            ${state.balance?.toFixed(2) ?? '0.00'}
          </span>
        </div>
      </section>
    </ATMFrame>
  );
}
