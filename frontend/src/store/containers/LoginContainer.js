import { connect } from 'react-redux';
import Login from './../components/account/login';
import { login, ftPassword } from './../middleware/thunks';
import { setStoreSession } from './../actions/';
import { getUserInfo } from './../selectors/';

export function mapStateToProps(state) {
    return {
        userInfo: getUserInfo(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        onForgotPassword: email => dispatch(ftPassword(email)),
        onLogin: data => dispatch(login(data)),
        onSetStoreSession: data => dispatch(setStoreSession(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
