import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Reminder() {
  const history = useHistory();

  const cancel = () => {
    history.goBack();
  };

  return (
    <div className="new-reminder">
      <h3>Fill in the form to create new reminder </h3>

      <form className="new-reminder-form">
        <label htmlFor="title">
          Title
          <input id="title" type="text" placeholder="Send email" />
        </label>
        <label htmlFor="desc">
          Description
          <textarea id="desc" placeholder="Open Chrome and..." />
        </label>
        <label htmlFor="date">
          Date
          <input id="date" type="date" />
        </label>
        <label htmlFor="repeat">
          Repeat:
          <select id="repeat">
            <option>Never</option>
            <option>Every Day</option>
            <option>Every Week</option>
            <option>Every Month</option>
            <option>Every Year</option>
          </select>
        </label>

        <label htmlFor="category">
          Category
          <select id="category">
            <option>Work</option>
            <option>Personal</option>
            <option>Others</option>
          </select>
        </label>

        <label htmlFor="attach">
          Attachments
          <input
            id="attach"
            type="text"
            placeholder="Attachments path"
            style={{ width: '37%' }}
          />
          <button type="button" style={{ marginRight: 0 }}>
            Attach Files
          </button>
        </label>
      </form>

      <div className="action-btns">
        <button type="button" onClick={cancel}>
          Cancel
        </button>
        <button type="button">Create</button>
      </div>
    </div>
  );
}
