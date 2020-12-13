import React from 'react';
import { editSelectedReminder, reminderToEdit } from "../../constants/global";

export default class Reminder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reminder: {
        title: "",
        description: "",
        repeatOn: "never",
        date: "",
        category: "work"
      }
    };
    this.cancel = this.cancel.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onRepeatChange = this.onRepeatChange.bind(this);
    this.goToAttachments = this.goToAttachments.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {

    let date = (reminderToEdit as any).date ? new Date((reminderToEdit as any).date).toISOString().substring(0,10) 
      : "2020-06-21";

    let reminder = {...reminderToEdit};
    (reminder as any).date = date;

    this.setState({
      reminder
    });
  }

  render() {
    return (
      <div>
        <div className="new-reminder">
          <h3>Update your reminder and save changes</h3>

          <form className="new-reminder-form">
            <label htmlFor="title">
              Title
              <input
                id="title"
                type="text"
                placeholder="Add title..."
                value={this.state.reminder.title}
                onChange={this.onTitleChange}
              />
            </label>
            <label htmlFor="desc">
              Description
              <textarea
                id="desc"
                placeholder="Add description..."
                value={this.state.reminder.description}
                onChange={this.onDescChange}
              />
            </label>
            <label htmlFor="date">
              Date
              <input
                id="date"
                type="date"
                value={this.state.reminder.date}
                onChange={this.onDateChange}
              />
            </label>
            <label htmlFor="repeat">
              Repeat:
              <select
                id="repeat"
                value={this.state.reminder.repeatOn}
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
                value={this.state.reminder.category}
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
                id="attach"
                type="button"
                style={{ marginRight: 0 }}
                onClick={this.goToAttachments}
                value="View all"
              />
            </label>
          </form>

          <div className="action-btns">
            <button type="button" style={{width: "100px"}} onClick={this.cancel}>
              Cancel
            </button>
            <button type="button" style={{width: "100px", color: "white", background: "#0e4ca7", padding: "0"}}
            onClick={this.submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  cancel() {
    const { history } = this.props;
    
    history.push('/');
  }

  submit() {
    console.log('edited reminder ==> ', this.state.reminder);

    editSelectedReminder(this.state.reminder);
    setTimeout(() => { this.cancel()}, 2000);
  }

  goToAttachments() {

    const { history } = this.props;
    
    history.push('/documents_list');
  }

  onTitleChange(e: any) {
    if (!e) return;

    let reminder = {...this.state.reminder};

    reminder.title = e.target.value;

    this.setState({
      reminder
    });
  }

  onDescChange(e: any) {
    if (!e) return;

    let reminder = {...this.state.reminder};
    reminder.description = e.target.value;

    this.setState({
      reminder
    });
  }

  onDateChange(e: any) {
    if (!e) return;

    let reminder = {...this.state.reminder};
    reminder.date = e.target.value;

    this.setState({
      reminder
    });
  }

  onRepeatChange(e: any) {
    if (!e) return;

    let reminder = {...this.state.reminder};
    reminder.repeat = e.target.value;

    this.setState({
      reminder
    });
  }

  onCategoryChange(e: any) {
    if (!e) return;

    let reminder = {...this.state.reminder};
    reminder.category = e.target.value;

    this.setState({
      reminder
    });
  }
}
