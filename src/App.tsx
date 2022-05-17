import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Error } from "./pages";
import { Provider as StoreProvider } from "mobx-react";

import { todoStore } from "./stores";

const stores = {
  todoStore
};

const App = () => {
  return (
    <div className="App">
      <StoreProvider {...stores}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
};

export default App;
