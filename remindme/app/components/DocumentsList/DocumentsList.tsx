import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DocumentsList.css';
import routes from '../../constants/routes.json';

export default function DocumentsList() {
  return (
    <div>
      Documents List page
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.REMINDER}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
    </div>
  );
}
