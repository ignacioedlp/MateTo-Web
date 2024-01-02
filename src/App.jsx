import AuthProvider from "./provider/authProvider.jsx";
import Routes from "./routes";
import { Toaster } from 'sonner'

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes />
    </AuthProvider>
  );
}

export default App;
