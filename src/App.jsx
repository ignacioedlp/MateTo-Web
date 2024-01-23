import AuthProvider from "./provider/authProvider.jsx";
import SettingsProvider from "./provider/settingsProvider.jsx";
import Routes from "./routes/index.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Toaster />
        <Routes />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
