import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Favorite from "./pages/Favorites/Favorite";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search" component={Search} />
            <Route path="/favorites" component={Favorite} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
