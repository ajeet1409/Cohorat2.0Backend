import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './features/shared/global.scss'

import App from "./App.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
