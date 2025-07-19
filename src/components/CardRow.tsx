import { CARD_IMAGES } from '../constants/cards';
import { useATMApp } from '../context/ATMAppContext';

export default function CardRow() {
  const { state } = useATMApp()!;
  const userCardType = (state.cardType).toLowerCase();

  return (
    <div className="flex flex-row justify-center items-center gap-1 mb-2 mt-[30px]">
      {CARD_IMAGES.map(card => (
        <div
          key={card.type}
          className="rounded p-1 bg-white flex items-center justify-center transition-all"
          style={{
            opacity: userCardType === card.type ? 1 : 0.3,
            border: userCardType === card.type ? '2px solid #38bdf8' : '2px solid transparent',
            boxShadow: userCardType === card.type ? '0 0 12px #38bdf8' : 'none',
            width: 36, height: 24,
            background: 'white'
          }}
          title={card.label}
        >
          <img
            src={card.src}
            alt={card.label}
            className="object-fill"
            style={{ width: '100%', height: '100%' }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
