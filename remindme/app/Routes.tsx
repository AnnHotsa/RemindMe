import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ReminderPage from './containers/ReminderPage';
import RemindersListPage from './containers/RemindersListPage';
import DocumentsListPage from './containers/DocumentsListPage';
import NewReminderPage from './containers/NewReminderPage';
import ViewReminderPage from './containers/ViewReminderPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.NEW_REMINDER} component={NewReminderPage} />
        <Route path={routes.VIEW_REMINDER} component={ViewReminderPage} />
        <Route path={routes.REMINDER} component={ReminderPage} />
        <Route path={routes.REMINDERS_LIST} component={RemindersListPage} />
        <Route path={routes.DOCUMENTS_LIST} component={DocumentsListPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
