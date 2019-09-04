import { combineReducers } from 'redux';
import page from './page';
import user from './user';
import categorie from './categorie';

export default combineReducers({
  page, user, categorie 
})