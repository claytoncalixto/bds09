import PrivateRoute from 'components/PrivateRoute';
import { Switch} from 'react-router-dom';
import Navbar from './Navbar';

import './styles.css';
import Users from './User';

const Admin = () => {
  return (
    <div className="admin-conatiner">
      <Navbar />
      <div className="admin-content">
        <Switch>
            <PrivateRoute path="/admin/users" roles={['ROLE_MEMBER']}>
                <Users />
            </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
