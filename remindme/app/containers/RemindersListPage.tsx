import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import RemindersList from '../components/RemindersList/RemindersList';

import { counterStateType } from '../reducers/types';

function mapStateToProps(state: counterStateType) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersList);