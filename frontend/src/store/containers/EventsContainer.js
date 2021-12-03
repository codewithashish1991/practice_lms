import { connect } from 'react-redux';
import { setEventList, setEventDetails, setEventRegister } from './../middleware/thunks';
import { getUserInfo } from './../selectors/';
import Events from './../components/events/';

export function mapStateToProps(state, ownProps) {
    return {
        currentUser: getUserInfo(state),
        slug: (
            ownProps.match.params.slug
        ) ? ownProps.match.params.slug : '',
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onSetEventDetails: slug => dispatch(setEventDetails(slug)),
        onSetEventList: data => dispatch(setEventList(data)),
        onSetEventRegistration: data => dispatch(setEventRegister(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
