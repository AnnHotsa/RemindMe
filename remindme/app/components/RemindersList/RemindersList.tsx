import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './RemindersList.css';
// import routes from '../../constants/routes.json';
import * as categoriesList from "../../constants/categories.json";
import { withRouter } from 'react-router-dom';
// import {
//   mapRemindersToComponent,
//   mapCategoriesToComponent
// } from '../../common/mappers';

import { selectReminderToEdit, remindersList, markAsDoneUndone, deleteSelectedReminder } from "../../constants/global";


// export default function Reminder() {
//   return (
//     <div className="reminders-list">
//       {/* <Link to={routes.HOME}>
//           <i className="fa fa-arrow-left fa-3x" />
//         </Link> */}
//       <div className="left-container">
//         <div className="controls">
//           <input
//             type="text"
//             className="reminders-search"
//             placeholder="Search..."
//           />
//           <button type="button" className="reminders-filter">
//             Filter By
//           </button>
//         </div>
//         <div className="reminders">{mapRemindersToComponent()}</div>
//       </div>
//       <div className="right-container">
//         <div className="categories">
//           <h3>Categories</h3>
//           {mapCategoriesToComponent()}
//         </div>
//         <div className="occurence">
//           <h3>When</h3>
//           <button type="button">Today</button>
//           <button type="button">Tomorrow</button>
//           <button type="button">Upcoming</button>
//         </div>
//       </div>
//     </div>
//   );
// }



export class RemindersList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      reminders: [],
      categories: [],
    };
    this.mapRemindersToComponent = this.mapRemindersToComponent.bind(this);
    this.mapCategoriesToComponent = this.mapCategoriesToComponent.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
    this.searchReminder = this.searchReminder.bind(this);

  }

  componentDidMount() {
    console.log("mount")
    this.setState({
      categories: [...(categoriesList as any).default],
      reminders: [...remindersList],
    });
  }

  render() {
    return (
      <div className="reminders-list">
        {/* <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link> */}
        <div className="left-container">
          <div className="controls">
            <input
              type="text"
              className="reminders-search"
              placeholder="Search..."
              onChange={this.searchReminder}
            />
            <button type="button" className="reminders-filter">
              Filter by
            </button>
          </div>
          <div className="reminders">{this.mapRemindersToComponent()}</div>
        </div>
        <div className="right-container">
          <div className="categories">
            <h3>Categories</h3>
            <button type="button" style={{ width: "100px" }} data-category={"all"} onClick={this.filterCategory}>All</button>
            {this.mapCategoriesToComponent()}
          </div>
          <div className="occurence">
            <h3>When</h3>
            <button type="button">Today</button>
            <button type="button">Tomorrow</button>
            <button type="button">Upcoming</button>
          </div>
        </div>
      </div>
    );
  }

  searchReminder(e: any) {
    let searchValue = e.target.value;

    if (!searchValue) { 
      this.setState({
        reminders:  [...(remindersList as any)]
      }); 
    }

    console.log("remidner to search => ", searchValue);

    let reminders = [...remindersList];

    let result = reminders.filter((r: any) => {
      return r.title.toUpperCase().startsWith(searchValue.toUpperCase());
    });

    this.setState({
      reminders: result
    });
  }

  mapRemindersToComponent() {

    if (!this.state.reminders.length) {
      return <p>No reminders available</p>;
    }

    const { history } = this.props;

    const editReminder = (e: any) => {
      history.push('/reminder');

      if (e.target.dataset.id) {
        selectReminderToEdit(this.state.reminders.filter((r: any) => r.id === e.target.dataset.id)[0]);
      }
    };

    const viewReminder = (e: any) => {
      history.push('/view_reminder');

      if (e.target.dataset.id) {
        selectReminderToEdit(this.state.reminders.filter((r: any) => r.id === e.target.dataset.id)[0]);
      }
    };

    const deleteReminder = (e: any) => {
      if (e && e.target && e.target.dataset.id) {
        deleteSelectedReminder(e.target.dataset.id);

        let updatedReminders = [...this.state.reminders].filter((r: any) => {
          return e.target.dataset.id !== r.id;
        });

        this.setState({
          reminders: updatedReminders
        });     

      }
    }

    const handleClick = () => { };

    const handleCheckbox = (e: any) => {
      console.log("checkbox handler => ", e.target.checked, e.target.id);

      let title = document.getElementById(`${e.target.id}-title`);

      e.target.checked ? title?.classList.add("done") : title?.classList.remove("done");


      let updatedReminders = [...this.state.reminders].map((r: any) => {
        let reminder = {...r};
        if (reminder.id === e.target.id) reminder.done = e.target.checked;
        return reminder;
      });

      markAsDoneUndone(e.target.checked, e.target.id);

      this.setState({
        reminders: updatedReminders
      });     

    }

    return this.state.reminders.map((reminder: any) => {
      return (
        <div
          role="link"
          key={reminder.id}
          className={"reminder" + (reminder.done ? " done" : "")}
          // onClick={editReminder}
          onKeyDown={handleClick}
          tabIndex={0}
        >
          <div className="reminder-title">
            <label className="reminder-checkbox-container">
              <input type="checkbox" id={reminder.id} className="reminder-checkbox"
               name="title" value={reminder.done} checked={reminder.done} onChange={handleCheckbox} />

              <span className="checkmark"></span>
              <span id={reminder.id + "-title"} className={"title-label" + (reminder.done ? " done" : "")}>{reminder.title}</span>

            </label>
            <div className="reminder-info">
              <label className="desc-label">
                {reminder.isRegular
                  ? `Repeated ${reminder.repeatOn}`
                  : new Date(reminder.date || '').toDateString()}
              </label>
            </div>
          </div>

          <div className="reminder-actions">
            <button type="button" data-id={reminder.id} onClick={viewReminder}>View</button>
            <button type="button" data-id={reminder.id} onClick={editReminder}>Edit</button>
            <button type="button" data-id={reminder.id} onClick={deleteReminder}>Delete</button>
          </div>
        </div>
      );
    });
  }


  mapCategoriesToComponent() {

    return this.state.categories.map((category: any) => {
      return (
        <div key={category.id} className="category">
          <button type="button" data-category={category.title.toLowerCase()} onClick={this.filterCategory}>{category.title}</button>
        </div>
      );
    });
  }

  filterCategory(e: any) {
    console.log("event ==> ", e);
    console.log(e.target.getAttribute('data-category'))

    if (e.target.getAttribute('data-category') === "all") {
      this.setState({
        reminders: [...(remindersList as any)]
      });
      return;
    }

    let category = e.target.getAttribute('data-category');
    console.log("catgory ==> ", category);

    this.setState({
      reminders: remindersList.filter((r: any) => r.category === category)
    });
  }

}


export default withRouter(RemindersList);
