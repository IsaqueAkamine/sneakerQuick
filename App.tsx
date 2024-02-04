import "react-native-gesture-handler";
import React from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/store";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
