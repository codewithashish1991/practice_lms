import { connect } from 'react-redux';
import Teams from './../components/account/our-team';
import { setTeamList } from './../middleware/thunks';

export function mapDispatchToProps(dispatch) {
    return {
        onSetTeamList: id => dispatch(setTeamList(id)),
    };
}

export default connect(null, mapDispatchToProps)(Teams);
