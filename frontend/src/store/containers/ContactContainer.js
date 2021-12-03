import { connect } from 'react-redux';
import ContactUs from './../components/contact/';
import { setContact } from './../middleware/thunks';
import { getBlocks } from './../selectors/';

export function mapStateToProps(state) {
    return {
        blocks: getBlocks(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onSetContact: data => dispatch(setContact(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
