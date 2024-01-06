import AuthProvider from "./provider/authProvider.jsx";
import Routes from "./routes/index.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes />
    </AuthProvider>
  );
}

export default App;
