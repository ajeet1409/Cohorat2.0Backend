import { createRoot } from "react-dom/client";
// import './features/shared/global.scss'

import App from "./App.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { SongContextProvider } from "./features/home/song.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SongContextProvider>
      <App />
    </SongContextProvider>
  </AuthProvider>,
);
