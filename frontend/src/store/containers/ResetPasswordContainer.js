import { connect } from 'react-redux';
import ResetPassword from './../components/account/reset-password';
import { verifyToken, resetPassword } from './../middleware/thunks';


export function mapDispatchToProps(dispatch) {
    return {
        onResetPassword: data => dispatch(resetPassword(data)),
        verifyToken: token => dispatch(verifyToken(token)),
    };
}

export default connect(null, mapDispatchToProps)(ResetPassword);
