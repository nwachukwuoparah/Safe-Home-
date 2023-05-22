import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./Components/ContexApi/Contex";
import { Provider } from "react-redux";
import { store } from "./REDUX/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const persistor = persistStore(store);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);
