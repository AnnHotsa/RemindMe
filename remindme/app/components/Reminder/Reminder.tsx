import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Reminder.css';
// import routes from '../../constants/routes.json';

import { useHistory } from 'react-router-dom';

export default function Reminder() {
  const history = useHistory();

  const goBackHome = () => {
    history.push('/');
  };

  const goToAttachmenets = () => {
    history.push('/documents_list');
  };

  return (
    <div>
      {/* <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <Link to={routes.DOCUMENTS_LIST}>Documents List</Link> */}
      <div className="new-reminder">
        <h3>Update your Reminder and save changes</h3>

        <form className="new-reminder-form">
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              placeholder="Send email"
              value="Process Invoice"
            />
          </label>
          <label htmlFor="desc">
            Description
            <textarea
              id="desc"
              placeholder="Open Chrome and..."
              value="Fill the data about your monthly process invoice"
            />
          </label>
          <label htmlFor="date">
            Date
            <input id="date" type="date" value={new Date().toDateString()} />
          </label>
          <label htmlFor="repeat">
            Repeat:
            <select id="repeat" value="Every Month">
              <option>Never</option>
              <option>Every Day</option>
              <option>Every Week</option>
              <option>Every Month</option>
              <option>Every Year</option>
            </select>
          </label>

          <label htmlFor="category">
            Category
            <select id="category" value="Work">
              <option>Work</option>
              <option>Personal</option>
              <option>Others</option>
            </select>
          </label>

          <label htmlFor="attach">
            Attachments
            <input
              id="attach"
              type="button"
              style={{ marginRight: 0 }}
              onClick={goToAttachmenets}
              value="View all"
            />
          </label>
        </form>

        <div className="action-btns">
          <button type="button" onClick={goBackHome}>
            Back to all reminders
          </button>
          <button type="button">Save</button>
        </div>
      </div>
    </div>
  );
}
