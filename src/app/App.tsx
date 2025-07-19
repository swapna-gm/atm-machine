import { Navigate, Route, Routes } from "react-router-dom";
import PinEntryScreen from "../features/auth/PinEntryScreen";
import DashboardScreen from "../features/dashboard/DashboardScreen";
import CheckBalanceScreen from "../features/transaction/CheckBalanceScreen";
import DepositFundsScreen from "../features/transaction/DepositFundsScreen";
import WithdrawFundsScreen from "../features/transaction/WithdrawFundsScreen";
import ProtectedRoute from '../routes/ProtectedRoute';
import HomeScreen from "../features/home/HomeScreen";
import TransactionSuccessScreen from "../features/transaction/TransactionSuccessScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/enter-pin" element={<PinEntryScreen />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/withdraw"
        element={
          <ProtectedRoute>
            <WithdrawFundsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deposit"
        element={
          <ProtectedRoute>
            <DepositFundsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/balance"
        element={
          <ProtectedRoute>
            <CheckBalanceScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/success" element={<ProtectedRoute><TransactionSuccessScreen /></ProtectedRoute>} />
      <Route path="*" element={<div className="text-center">404 - Page Not Found</div>} />
    </Routes>
  )
}

export default App;