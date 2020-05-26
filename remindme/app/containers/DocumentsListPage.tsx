import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { counterStateType } from '../reducers/types';
import DocumentsList from '../components/DocumentsList/DocumentsList';

function mapStateToProps(state: counterStateType) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
