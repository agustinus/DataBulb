import {combineReducers} from 'redux';
import DataGovReducer from './DataGovReducer';

let Reducer = combineReducers({dataGov: DataGovReducer});

export default {Reducer};
