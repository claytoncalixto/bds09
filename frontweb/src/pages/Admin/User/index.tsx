import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
 
const Users = () => {
  const [page, setPage] = useState<SpringPage<User>>();
 
  useEffect(() => {
    const params : AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
    };
 
    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);
 
  return (
    <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}{item.name}</p>
      ))}
    </div>
  );
};
 
export default Users;
