import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RemindersList.css';
import routes from '../../constants/routes.json';
import * as reminders from '../../constants/reminders.json';

interface Reminder {
  id: string;
  title: string;
  description: string;
  attachments: string[];
  isRegular: boolean;
  date?: number;
  repeatOn?: string;
  startDate?: number;
  endDate?: number;
}

export function mapRemindersToComponent() {
  if (!reminders) {
    return null;
  }

  return reminders.map((reminder: Reminder) => {
    return (
      <div key={reminder.id}>
        <h1>
          Title:
          {reminder.title}
        </h1>
        <hr />
        <p>
          Description:
          {reminder.description}
        </p>
      </div>
    );
  });
}

export default function Reminder() {
  return (
    <div>
      Reminders List Page
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        {mapRemindersToComponent()}
      </div>
    </div>
  );
}
