import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RemindersList.css';
import routes from '../../constants/routes.json';

type Props = {};

export default function Reminder(props: Props) {
  return (
    <div>
      Reminders List Page
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
    </div>
  );
}
