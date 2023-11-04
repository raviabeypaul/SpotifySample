import "./App.css";
import ConfigStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import InitialCircularProgress from "./components/CircularProgress";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Provider store={ConfigStore().store}>
      <PersistGate
        loading={<InitialCircularProgress />}
        persistor={ConfigStore().persistor}
      >
            <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
