import Navbar from 'components/Navbar';
import Admin from 'pages/Admin';
import Auth from 'pages/Admin/Auth';
import MovieDetails from 'pages/MovieDetails';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import history from 'util/history';
import Movies from 'pages/Movies';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Redirect from="/" to="/admin/auth/login" exact />
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/movies" exact>
        <Movies />
      </Route>
      <Route path="/movies/:moviesId">
        <MovieDetails />
      </Route>
      <Redirect from="/admin/auth" to="/admin/auth/login" exact />
      <Route path="/admin/auth">
        <Auth />
      </Route>
      <Redirect from="/admin" to="/admin/movies" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
