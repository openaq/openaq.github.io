import { combineReducers } from 'redux';
import baseData from './base-data';
import projects from './projects';
import locations from './locations';
import location from './location';
import baseStats from './base-stats';
import geolocation from './geolocation';
import measurements from './measurements';
import compare from './compare';
import locationsByCountry from './locations-by-country';
import downloadModal from './download-modal';
import voteModal from './vote-modal';

export default combineReducers({
  baseData,
  projects,
  locations,
  location,
  baseStats,
  geolocation,
  measurements,
  compare,
  locationsByCountry,
  downloadModal,
  voteModal,
});
