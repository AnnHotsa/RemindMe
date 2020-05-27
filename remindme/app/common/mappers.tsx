import React from 'react';
import * as reminders from '../constants/reminders.json';
import * as categories from '../constants/categories.json';

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
      <div key={reminder.id} className="reminder">
        <div className="reminder-info">
          <h3>
            Title:
            {reminder.title}
          </h3>
          {/* <p>
                Description:
                {reminder.description}
            </p> */}
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
        <h1>
          Title:
          {category.title}
        </h1>
        <hr />
      </div>
    );
  });
}
