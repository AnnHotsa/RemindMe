import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import NewReminder from '../components/NewReminder/NewReminder';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReminder);
