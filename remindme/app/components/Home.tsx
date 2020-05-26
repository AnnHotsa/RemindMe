import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import RemindersListPage from '../containers/RemindersListPage';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>RemindMe</h2>
      {/* <Link to={routes.COUNTER}>Add Reminder</Link> */}
      <Link to={routes.REMINDER}>Reminder Page</Link>
      <Link to={routes.REMINDERS_LIST}>Reminders List</Link>
      <RemindersListPage />
    </div>
  );
}
