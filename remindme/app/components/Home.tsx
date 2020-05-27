import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import RemindersListPage from '../containers/RemindersListPage';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      {/* <h3>RemindMe</h3> */}
      <Link to={routes.NEW_REMINDER} className="new-reminder">
        + New Reminder
      </Link>
      {/* <Link to={routes.COUNTER}>Add Reminder</Link> */}
      {/* <Link to={routes.REMINDERS_LIST}>Reminders List</Link> */}
      <RemindersListPage />
    </div>
  );
}
