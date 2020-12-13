import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Reminder.css';
// import routes from '../../constants/routes.json';

import { useHistory } from 'react-router-dom';

import { reminderToEdit } from "../../constants/global";

export default function Reminder() {
  const history = useHistory();

  const goBackHome = () => {
    history.push('/');
  };

  const goToAttachmenets = () => {
    history.push('/documents_list');
  };

  console.log("reminder to edit => ", reminderToEdit);

  let reminder = {...reminderToEdit} as any;

  let date = reminder.date ? new Date(reminder.date).toISOString().substring(0,10) : "2020-06-21";

  return (
    <div>
      {/* <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <Link to={routes.DOCUMENTS_LIST}>Documents List</Link> */}
      <div className="new-reminder">
        <h3>Update your reminder and save changes</h3>

        <form className="new-reminder-form">
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              placeholder="Send email"
              value={reminder.title}
            />
          </label>
          <label htmlFor="desc">
            Description
            <textarea
              id="desc"
              placeholder="Open Chrome and..."
              value={reminder.description}
            />
          </label>
          <label htmlFor="date">
            Date
            <input id="date" type="date" value={date} />
          </label>
          <label htmlFor="repeat">
            Repeat:
            <select id="repeat" value={reminder.repeatOn}>
              <option>Never</option>
              <option>Every Day</option>
              <option>Every Week</option>
              <option>Every Month</option>
              <option>Every Year</option>
            </select>
          </label>

          <label htmlFor="category">
            Category
            <select id="category" value={reminder.category}>
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
            Back
          </button>
          <button type="button" style={{width: "100px", color: "white", background: "#0e4ca7", padding: "0"}}>Save</button>
        </div>
      </div>
    </div>
  );
}
