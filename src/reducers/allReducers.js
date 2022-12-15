import  weatherReducer  from './weatherReducer'
import  favoritesReducer  from './favoritesReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    weatherReducer,
    favoritesReducer
})

export default rootReducer