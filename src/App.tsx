import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage/QuotesPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/quotes/:id">
            <QuotesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
