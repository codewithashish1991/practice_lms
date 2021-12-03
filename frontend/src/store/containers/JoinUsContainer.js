import { connect } from 'react-redux';
import JoinUs from './../components/join-us/';
import { setJoinUs } from './../middleware/thunks';

export function mapDispatchToProps(dispatch) {
    return {
        onSetJoinUs: data => dispatch(setJoinUs(data)),
    };
}

export default connect(null, mapDispatchToProps)(JoinUs);
