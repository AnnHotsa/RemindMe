
import * as allReminders from "./reminders.json";


let reminderToEdit = {};
let remindersList = [...(allReminders as any).default];

let selectReminderToEdit = (reminder: any) => {
    reminderToEdit = reminder;
}

let markAsDoneUndone = (doneStatus: boolean, id: string) => {
    remindersList = remindersList.map((r: any) => {
        let reminder = {...r};
        if (reminder.id === id) reminder.done = doneStatus;
        return reminder;
      });
}

let deleteSelectedReminder = (id: string) => {
    remindersList = [...remindersList].filter((r: any) => {
        return id !== r.id;
    });
}

export {reminderToEdit, remindersList, selectReminderToEdit, markAsDoneUndone, deleteSelectedReminder};
