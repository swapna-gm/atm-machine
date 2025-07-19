import React from 'react';
import atmSign from '../assets/atm_sign.png';
import graffiti from '../assets/graffiti.png';
import sticker from '../assets/sticker_graf.png';
import systems from '../assets/systems.png';
import styles from './ATMFrame.module.css';
import CardRow from './CardRow';

interface SideButton {
  enabled: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  text?: string;
}

interface ATMFrameProps {
  leftButtons: SideButton[];
  rightButtons: SideButton[];
  children: React.ReactNode;
}

export default function ATMFrame({
  leftButtons,
  rightButtons,
  children,
}: ATMFrameProps) {
  return (
    <main role="main" aria-label="ATM Machine"
      className="min-h-screen flex items-center flex-col justify-end bg-[#b399c8]">
      <div className={`w-[500px] h-[auto] z-40 ${styles.imageWrapper} relative mt-10`}>
        {/* ATM Sign */}
        <img
          src={atmSign}
          alt="ATM Sign"
          className="mb-3 w-[300px] h-[auto] object-contain rounded-b-2xl"
        />
        <img src={graffiti} alt="ATM graffiti" className={styles.graffiti} />
      </div>
      <div className="w-[420px] h-[6px] bg-gray-300 mt-[-2px]" />
      <section
        aria-label="ATM Content"
        className="h-[716px] w-[420px] bg-[#fcfcf7] shadow-2xl flex flex-col items-center overflow-hidden relative"
      >
        {/* Card logos row */}
        <CardRow />
        {/* Side buttons & blue screen content */}
        <nav className="w-full flex flex-row items-end justify-center" aria-label="ATM Actions">
          <div className="flex flex-col justify-end h-[100px]">
            {leftButtons.map((btn, i) => (
              <div key={i} className={`${styles.buttonContentWrapper} flex justify-start items-center`}>
                <button
                  tabIndex={btn.enabled ? 0 : -1}
                  onClick={btn.enabled ? btn.onClick : undefined}
                  className={`w-8 h-7 my-2 rounded bg-gray-300 border border-gray-400 shadow  ml-[-38px]
                    ${btn.enabled
                      ? 'hover:bg-blue-300 cursor-pointer focus:outline-2 focus:outline-blue-400'
                      : 'opacity-60 blur-[1.5px] cursor-not-allowed'}`}
                  disabled={!btn.enabled}
                  aria-label={`Left button ${i + 1}`}
                  aria-disabled={!btn.enabled}
                />
                {btn.text && (
                  <span className="sr-only">{btn.text}</span>
                )}
                <span className="font-retro text-gray-400">-</span>
                {btn.text && (
                  <div className="font-retro text-white z-40 mr-[-120px]">{`-${btn.text}`}</div>
                )}
              </div>
            ))}
          </div>
          {/* Blue screen content goes here */}
          {children}
          <div className="flex flex-col justify-end h-[100px]">
            {rightButtons.map((btn, i) => (
              <div key={i} className={`${styles.buttonContentWrapper} flex justify-end items-center`}>
                {btn.text && (
                  <div className="font-retro text-white ml-[-200px] z-40">{`${btn.text}-`}</div>
                )}
                <span className="font-retro text-gray-400">-</span>
                <button
                  tabIndex={btn.enabled ? 0 : -1}
                  onClick={btn.enabled ? btn.onClick : undefined}
                  aria-label={`ATM side button ${i + 1}`}
                  className={`w-8 h-7 my-2 rounded bg-gray-300 border border-gray-400 shadow
                      mr-[-38px]
                      ${btn.enabled
                      ? 'hover:bg-blue-300 cursor-pointer focus:outline-2 focus:outline-blue-400'
                      : 'opacity-60 blur-[1.5px] cursor-not-allowed'}`}
                  disabled={!btn.enabled}
                  aria-disabled={!btn.enabled}
                />
                {btn.text && (
                  <span className="sr-only">{btn.text}</span>
                )}
              </div>
            ))}
          </div>
        </nav>
        {/* Below blue screen: SYSTEMS and sticker */}
        <div className="flex justify-between items-start mt-3 w-[316px]">
          <img src={sticker} alt="ATM sticker" className="rotate-[-15deg]" />
          <img src={systems} alt="ATM supported systems" className="w-[75px] h-auto mb-1" />
        </div>
      </section>
    </main>
  );
}

