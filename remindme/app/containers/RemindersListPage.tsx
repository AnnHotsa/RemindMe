import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import RemindersList from '../components/RemindersList/RemindersList';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersList);
