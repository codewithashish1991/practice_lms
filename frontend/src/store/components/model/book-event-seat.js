import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number_of_guest: 0,
            errorsMsg: '',
            successMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const noOfGuest = (event && event.target.value);
        this.setState({ number_of_guest: noOfGuest });
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.props.user_id === 0) {
            alert('Please login to book your seat.');// eslint-disable-line no-alert
            return false;
        }
        if (this.validator.allValid()) {
            const data = {
                events: this.props.event_id,
                users: this.props.user_id,
                no_of_seats: parseInt(this.state.number_of_guest, 10),
                status: true,
            };
            const result = this.props.onEventRegistration(data);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = res.data.message;
                    this1.setState({
                        email: '',
                        successMsg: msg,
                    });
                    this.validator.hideMessages();
                } else {
                    const msg = res.message;
                    this1.setState({ errorsMsg: msg });
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
        return true;
    }
    render() {
        return (
            <div id="contact-form">
                <h6 className='text-center'><br/>&nbsp; Book My Seat</h6>
                <div className="modal-body">
                    <div className="row main-form">
                        <div className="col-md-12">
                            <div className="singel-form form-group">
                                <label>How many guests ? <span className="text-danger">*</span></label>
                                <input
                                    name="number_of_guest"
                                    onChange={this.handleChange}
                                    type="number"
                                    value={this.state.number_of_guest}
                                />
                                <span className="form-error">
                                    {this.validator.message('Number of guest', this.state.number_of_guest, 'required|integer|min:1,num')}
                                    <span className="form-error">
                                        {this.state.errorsMsg}
                                    </span>
                                    <span className="text-success">
                                        {this.state.successMsg}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick = { this.handleSubmit }>Submit</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    event_id: PropTypes.number.isRequired,
    onEventRegistration: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
};
