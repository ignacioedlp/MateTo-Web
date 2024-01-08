import AuthProvider from "./provider/authProvider.jsx";
import CartProvider from "./provider/cartProvider.jsx";
import FavoritesProvider from "./provider/favoriteProvider.jsx";
import SettingsProvider from "./provider/settingsProvider.jsx";
import Routes from "./routes/index.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <FavoritesProvider>
            <Toaster />
            <Routes />
          </FavoritesProvider>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
