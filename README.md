# ATM Machine Web App

A functional, visually accurate ATM machine simulation built in React + TypeScript with best practices.

---

## Highlights

- **Protected Routes:** Only authenticated users (after successful PIN entry) can access Dashboard and Transaction screens.
- **Accessibility:** Full keyboard navigation, proper focus management, ARIA labels, and screen reader friendly UI.
- **Test Cases:** Unit tests with Vitest + React Testing Library – coverage started and growing!
- **Modern React:** Context API for global state, clean modular structure, reusable UI components.

---

## Features
- PIN Entry: Secure 4-digit PIN validation flow (password-1234)
- Dashboard: Personalized welcome, card type, and balance
- Withdraw/Deposit: Fully functional, accurate transactions
- Balance Check: Quick balance view
- No Backend Required: Data stored in browser localStorage

---

## Tech Stack
- React 18+, TypeScript, Vite, Tailwind CSS, React Router v6
- Vitest + Testing Library

---

## Getting Started
  ```sh
  git clone https://github.com/swapna-gm/atm-machine.git
  cd atm-machine
  npm install
  npm run dev
  ```
---

## Running Tests
```sh
npm run test
```
---

## Project Structure
```
src/
  app/                 # Routing & app shell
  components/          # ATMFrame, CardRow, etc.
  features/
    auth/              # PIN entry screen
    dashboard/         # Dashboard screen
    transaction/       # Withdraw, deposit, balance screens
    home/              # Home screen
  context/             # Context API
  services/            # Local storage and API stubs
  constants/           # Card images/constants
  hooks/              # Custom hooks
```

