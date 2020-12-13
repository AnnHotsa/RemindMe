import React from 'react';

import { withRouter } from 'react-router-dom';
import * as fs from 'fs';
import * as path from 'path';
import * as reminders from '../../constants/reminders.json';
import { uuidv4 } from '../../common/helpers';

import { remote } from "electron";

export class NewReminder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      repeat: 'never',
      category: 'work',
      attachments: []
    };
    this.cancel = this.cancel.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onRepeatChange = this.onRepeatChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div className="new-reminder">
        <h3>Fill in the form to create new reminder </h3>

        <form className="new-reminder-form">
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              placeholder="Add title..."
              value={this.state.title}
              onChange={this.onTitleChange}
            />
          </label>
          <label htmlFor="desc">
            Description
            <textarea
              id="desc"
              placeholder="Add description..."
              value={this.state.description}
              onChange={this.onDescChange}
            />
          </label>
          <label htmlFor="date">
            Date
            <input
              id="date"
              type="date"
              value={this.state.date}
              onChange={this.onDateChange}
            />
          </label>
          <label htmlFor="repeat">
            Repeat:
            <select
              id="repeat"
              value={this.state.repeat}
              onChange={this.onRepeatChange}
            >
              <option value="never">Never</option>
              <option value="daily">Every Day</option>
              <option value="weekly">Every Week</option>
              <option value="monthly">Every Month</option>
              <option value="yearly">Every Year</option>
            </select>
          </label>

          <label htmlFor="category">
            Category
            <select
              id="category"
              value={this.state.category}
              onChange={this.onCategoryChange}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label htmlFor="attach">
            Attachments
            <input
              onClick={this.onBrowse}
              id="attach"
              type="button"
              style={{ marginRight: 0 }}
              value="Browse"
            />
          </label>
        </form>

        <div className="action-btns">
          <button type="button" style={{width: "100px"}} onClick={this.cancel}>
            Cancel
          </button>
          <button type="button" style={{width: "100px", color: "white", background: "#0e4ca7", padding: "0"}} onClick={this.submit}>
            Create
          </button>
        </div>
      </div>
    );
  }

  cancel() {
    const { history } = this.props;
    console.log('go back');
    history.goBack();
  }

  submit() {
    console.log('new reminder ==> ', this.state);

    const reminder = {
      id: uuidv4(),
      title: this.state.title,
      description: this.state.description,
      attachments: [],
      isRegular: this.state.repeat !== 'never',
      repeatOn: this.state.repeat,
      startDate: new Date(this.state.date).getTime(),
      endDate: 4743954000000,
      date:
        this.state.repeat === 'never'
          ? new Date(this.state.date).getTime()
          : '',
      category: this.state.category
    };

    const newArr = [...(reminders as any).default];
    newArr.push(reminder);

    console.log('all => ', newArr);

    const data = JSON.stringify(newArr);
    const newPath = path.join(__dirname, './constants/reminders.json');
    fs.writeFileSync(newPath, data);

    setTimeout(() => { this.cancel()}, 2000)
    // this.cancel();
  }

  onBrowse() {
    
    let window = remote.BrowserWindow.getFocusedWindow();
    remote.dialog.showOpenDialog((window as any), { 
      title: "Select file",
      filters: [
        {
          name: "All Files",
          extensions: []
        },
        {
          name: "Text Document",
          extensions: ["docx", "txt", "doc"]
        },
        {
          name: "Image File",
          extensions: ["jpeg", "png", "jpg", "svg", "bpm"]
        }
      ],
      properties: ['openFile', 'multiSelections'] 
    });
  }

  onTitleChange(e: any) {
    if (!e) return;

    this.setState({
      title: e.target.value
    });
  }

  onDescChange(e: any) {
    if (!e) return;

    this.setState({
      description: e.target.value
    });
  }

  onDateChange(e: any) {
    if (!e) return;

    this.setState({
      date: e.target.value
    });
  }

  onRepeatChange(e: any) {
    if (!e) return;

    this.setState({
      repeat: e.target.value
    });
  }

  onCategoryChange(e: any) {
    if (!e) return;

    this.setState({
      category: e.target.value
    });
  }
}

export default withRouter(NewReminder);
