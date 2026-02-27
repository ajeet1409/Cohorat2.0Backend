import {authContext} from '../../auth.context'
import { useContext } from 'react';

export const useAuth = () => {

  return useContext(authContext);
  
};

