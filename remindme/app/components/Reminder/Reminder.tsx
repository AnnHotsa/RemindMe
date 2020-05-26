import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Reminder.css';
import routes from '../../constants/routes.json';

export default function Reminder() {
  return (
    <div>
      Reminder page
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <Link to={routes.DOCUMENTS_LIST}>Documents List</Link>
    </div>
  );
}
