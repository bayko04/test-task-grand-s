import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import { Provider } from "react-redux";
import store from "../shared/store/store";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
