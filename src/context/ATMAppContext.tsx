import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

type View = 'PIN_ENTRY' | 'DASHBOARD' | 'WITHDRAW' | 'DEPOSIT' | 'BALANCE';

type ATMAppState = {
  currentView: View;
  isAuthenticated: boolean;
  enteredPin: string;
  balance: number;
  cardType: 'Visa' | 'MasterCard' | 'amex' | 'discover' | 'cirrus' | '';
  customerName: string;
  loading: boolean;
};

type ATMAppAction =
  | { type: 'AUTH_SUCCESS'; payload: { enteredPin: string; cardType: string; customerName: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'SET_BALANCE', payload: number }
  | { type: 'WITHDRAW_FUNDS'; payload: number }
  | { type: 'DEPOSIT_FUNDS'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' }

{/* initial state of the app */ }
const initialState: ATMAppState = {
  currentView: 'PIN_ENTRY',
  isAuthenticated: false,
  enteredPin: '',
  balance: 0,
  cardType: '',
  customerName: '',
  loading: false
};

const atmAppReducer = (state: ATMAppState, action: ATMAppAction): ATMAppState => {
  switch (action.type) {
    case 'RESET':
      return { ...initialState };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        enteredPin: action.payload.enteredPin,
        cardType: action.payload.cardType as 'Visa' | 'MasterCard' | 'amex' | 'discover' | 'cirrus' | '',
        customerName: action.payload.customerName,
        currentView: 'DASHBOARD',
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'WITHDRAW_FUNDS':
      return { ...state, balance: state.balance - action.payload };
    case 'DEPOSIT_FUNDS':
      return { ...state, balance: state.balance + action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const ATMAppContext = createContext<{
  state: ATMAppState;
  dispatch: React.Dispatch<ATMAppAction>;
} | null>(null);

export const ATMAppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(atmAppReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);
  return <ATMAppContext.Provider value={contextValue}>{children}</ATMAppContext.Provider>;
};

export const useATMApp = () => {
  const context = useContext(ATMAppContext);
  return context;
};
