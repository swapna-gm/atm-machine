import { useNavigate } from 'react-router-dom';
import ATMFrame from '../../components/ATMFrame';
import { useEffect } from 'react';
import { useATMApp } from '../../context/ATMAppContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { dispatch } = useATMApp()!;

  // Button configurations
  const leftButtons = Array(4).fill({ enabled: false });
  const rightButtons = [
    { enabled: false },
    { enabled: false },
    { enabled: false },
    { enabled: true, text: 'Enter PIN', ariaLabel: 'Enter PIN', onClick: () => navigate('/enter-pin') },
  ];

  // clear data on load
  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <ATMFrame leftButtons={leftButtons} rightButtons={rightButtons}>
      <section
        className="bg-[#88bce6] w-[316px] h-[300px] rounded-lg border-4 border-[#d4e3f4] shadow-inner font-retro text-white flex flex-col justify-between relative"
        style={{ fontSize: 16, lineHeight: '28px' }}
      >
        <div className="flex flex-col items-center mt-4">
          <span className="font-retro mb-2 tracking-wider">Welcome to the</span>
          <span className="font-retro tracking-wider">ATM</span>
        </div>
      </section>
    </ATMFrame>
  );
}
