import React from 'react';
import { useHistory } from 'react-router-dom';
import * as reminders from '../constants/reminders.json';
import * as categories from '../constants/categories.json';

// interface Reminder {
//   id: string;
//   title: string;
//   description: string;
//   attachments: string[];
//   isRegular: boolean;
//   date?: number;
//   repeatOn?: string;
//   startDate?: number;
//   endDate?: number;
// }

export function mapRemindersToComponent() {
  if (!reminders) {
    return null;
  }
  const history = useHistory();

  const editReminder = () => {
    history.push('/reminder');
  };

  const handleClick = () => {};

  return reminders.map(reminder => {
    return (
      <div
        role="link"
        key={reminder.id}
        className="reminder"
        onClick={editReminder}
        onKeyDown={handleClick}
        tabIndex={0}
      >
        <div className="reminder-info">
          <h3>{reminder.title}</h3>
          <h3>
            {reminder.isRegular
              ? `Repeated ${reminder.repeatOn}`
              : new Date(reminder.date || '').toDateString()}
          </h3>
        </div>
        <div className="reminder-actions">
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      </div>
    );
  });
}

interface Category {
  id: string;
  title: string;
}

export function mapCategoriesToComponent() {
  if (!categories) {
    return null;
  }

  return categories.map((category: Category) => {
    return (
      <div key={category.id} className="category">
        <button type="button">{category.title}</button>
      </div>
    );
  });
}
