import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './RemindersList.css';
// import routes from '../../constants/routes.json';
import {
  mapRemindersToComponent,
  mapCategoriesToComponent
} from '../../common/mappers';

export default function Reminder() {
  return (
    <div className="reminders-list">
      {/* <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link> */}
      <div className="left-container">
        <div className="controls">
          <input
            type="text"
            className="reminders-search"
            placeholder="Search..."
          />
          <button type="button" className="reminders-filter">
            Filter By
          </button>
        </div>
        <div className="reminders">{mapRemindersToComponent()}</div>
      </div>
      <div className="right-container">
        <h3>Categories</h3>
        {mapCategoriesToComponent()}
      </div>
    </div>
  );
}
