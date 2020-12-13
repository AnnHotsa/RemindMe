
import * as allReminders from "./reminders.json";
import * as fs from 'fs';
import * as path from 'path';


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

    
    const data = JSON.stringify(remindersList);
    const newPath = path.join(__dirname, '../app/constants/reminders.json');
    fs.writeFileSync(newPath, data);
}

let deleteSelectedReminder = (id: string) => {
    remindersList = [...remindersList].filter((r: any) => {
        return id !== r.id;
    });

    const data = JSON.stringify(remindersList);
    const newPath = path.join(__dirname, '../app/constants/reminders.json');
    fs.writeFileSync(newPath, data);
}

export {reminderToEdit, remindersList, selectReminderToEdit, markAsDoneUndone, deleteSelectedReminder};
