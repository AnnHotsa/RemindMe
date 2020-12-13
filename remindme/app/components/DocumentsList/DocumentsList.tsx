import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './DocumentsList.css';
// import routes from '../../constants/routes.json';
import { useHistory } from 'react-router-dom';

const { remote } = require('electron');

export default function DocumentsList() {
  const history = useHistory();

  const goBackHome = () => {
    history.push('/reminder');
  };

  const attachFiles = () => {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openFile', 'multiSelections']
    });
  };

  const showInFolder = () => {
    remote.shell.openItem(
      'C:/Users/Anna/AppData/Roaming/RemindMe/reminders/1d088cb6-bbfd-4df0-a1dd-76a8c16081ba/attachments/March Invoice.docx'
    );
  };

  const openFolder = () => {
    remote.shell.openItem(
      'C:/Users/Anna/AppData/Roaming/RemindMe/reminders/1d088cb6-bbfd-4df0-a1dd-76a8c16081ba/attachments'
    );
  };

  return (
    <div className="documents-list">
      <h3>Attachments to &apos;Process Invoice&apos;</h3>

      <div className="documents">
        <div className="document">
          <h3>Invoice document.docx</h3>
          <div className="document-actions">
            <button type="button">Open</button>
            <button type="button">Delete</button>
          </div>
        </div>
        <div className="document">
          <h3>March Invoice.docx</h3>
          <div className="document-actions">
            <button type="button" onClick={showInFolder}>
              Open
            </button>
            <button type="button">Delete</button>
          </div>
        </div>
        <div className="document">
          <h3>Salary report.docx</h3>
          <div className="document-actions">
            <button type="button">Open</button>
            <button type="button">Delete</button>
          </div>
        </div>
      </div>

      <div className="action-btns">
        <button type="button" onClick={goBackHome} style={{ marginLeft: 0 }}>
          Back
        </button>
        <div>
          <button type="button" style={{ width: "auto" }} onClick={openFolder}>
            View in folder
          </button>
          <button type="button" style={{ width: "auto" }} onClick={attachFiles}>
            Attach more
          </button>
        </div>
      </div>
    </div>
  );
}
