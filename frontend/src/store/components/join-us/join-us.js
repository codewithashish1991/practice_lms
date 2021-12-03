import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

export default class AddJoinWithUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                phone: '',
                designation: '',
                gender: '',
                dob: '',
                city: '',
                state: '',
                country: '',
                experience_in_month: '',
                experience_in_years: '',
                resume: '',
            },
            successMsg: '',
            errorsMsg: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new SimpleReactValidator();
    }

    handleChange(event) {
        const inputValue = (event && event.target.value);
        const inputName = (event && event.target.name);
        const { data } = this.state;
        if (event.target.files) {
            const file = (event && event.target.files[0]);
            data[inputName] = file;
        } else {
            data[inputName] = inputValue;
        }
        this.setState({ data });
    }

    validateFile() {
        const file = this.state.data.resume.name;
        if (file) {
            const fileNameArray = file.split('.');
            const fext = fileNameArray[fileNameArray.length - 1];
            if (fext === 'pdf' || fext === 'doc' || fext === '.docx') {
                return true;
            }
            alert('Invalid file format. Only doc, docx and pdf allowed'); // eslint-disable-line no-alert
        } else {
            alert('please your upload resume.'); // eslint-disable-line no-alert
        }
        return false;
    }

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.validator.allValid() && this.validateFile()) {
            const formData = new FormData();
            formData.append('name', this.state.data.name);
            formData.append('email', this.state.data.email);
            formData.append('phone', this.state.data.phone);
            formData.append('designation', this.state.data.designation);
            formData.append('gender', this.state.data.gender);
            formData.append('dob', this.state.data.dob);
            formData.append('city', this.state.data.city);
            formData.append('state', this.state.data.state);
            formData.append('country', this.state.data.country);
            formData.append('experience_in_month', this.state.data.experience_in_month);
            formData.append('experience_in_years', this.state.data.experience_in_years);
            formData.append('resume', this.state.data.resume, this.state.data.resume.name);
            formData.append('status', true);
            const result = this.props.onSetJoinUs(formData);
            this.setState({ errorsMsg: '', successMsg: '' });
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = 'Your information submitted successfully.';
                    const resetData = {
                        name: '',
                        email: '',
                        phone: '',
                        designation: '',
                        gender: '',
                        dob: '',
                        city: '',
                        state: '',
                        country: '',
                        experience_in_month: '',
                        experience_in_years: '',
                        resume: '',
                    };
                    this1.setState({
                        successMsg: msg,
                        data: resetData,
                    });
                } else {
                    const msg = 'Something went wrong. Please try again after sometime.';
                    this1.setState({ errorsMsg: msg });
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="col-lg-12">
                <div className="contact-from">
                    <div className="section-title">
                        <h2>Join Us Now</h2>
                        <p>
                            We provide all study material to our students.
                            Now you can make a part of our team.<br />
                            Just fill following form and we will be contact you
                            as soon as possible.
                        </p>
                    </div>
                    <div className="main-form pt-45">
                        <form id="contact-form" method="post" data-toggle="validator">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="singel-form form-group">
                                        <label>Name: </label>
                                        <input
                                            name="name"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.name}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Name', this.state.data.name, 'required|max:120')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="singel-form form-group">
                                        <label>Email Address: </label>
                                        <input
                                            name="email"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.email}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Email Address', this.state.data.email, 'required|email')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="singel-form form-group">
                                        <label>Mobile Number: </label>
                                        <input
                                            name="phone"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.phone}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Mobile Number', this.state.data.phone, 'required|numeric|min:10|max:12')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4 no-gutters">
                                    <div className="singel-form form-group">
                                        <label>Gender: </label>
                                        <select
                                            className = "form-control"
                                            name="gender"
                                            onChange={this.handleChange}
                                            type="text"
                                            defaultValue={this.state.data.gender}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male"> Male</option>
                                            <option value="Female" >Female</option>
                                        </select>
                                        <span className="form-error">
                                            {this.validator.message('Gender', this.state.data.gender, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4 no-gutters">
                                    <div className="singel-form form-group">
                                        <label>Designation: </label>
                                        <select
                                            className = "form-control"
                                            name="designation"
                                            onChange={this.handleChange}
                                            type="text"
                                            defaultValue={this.state.data.designation}
                                        >
                                            <option value=""> --Select -- </option>
                                            <option value="Teacher"> Teacher</option>
                                            <option value="Event Organiser">Event Organiser</option>
                                            <option value="Blogger">Blogger/ News Provider</option>
                                        </select>
                                        <span className="form-error">
                                            {this.validator.message('Designation', this.state.data.designation, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="singel-form form-group">
                                        <label>Date Of Birth: </label>
                                        <input
                                            name="dob"
                                            onChange={this.handleChange}
                                            type="date"
                                            value={this.state.data.dob}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Date Of Birth', this.state.data.dob, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="singel-form form-group">
                                        <label>Country: </label>
                                        <input
                                            name="country"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.country}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Country', this.state.data.country, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="singel-form form-group">
                                        <label>State: </label>
                                        <input
                                            name="state"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.state}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('State', this.state.data.state, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="singel-form form-group">
                                        <label>City: </label>
                                        <input
                                            name="city"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={this.state.data.city}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('City', this.state.data.city, 'required')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <label>Working Experience: </label>
                                        <input
                                            className = "form-control"
                                            name="experience_in_month"
                                            onChange={this.handleChange}
                                            placeholder="In Month"
                                            type="text"
                                            value={this.state.data.experience_in_month}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Experience', this.state.data.experience_in_month, 'integer|min:1,num|max:11,num')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="singel-form form-group">
                                        <label>&nbsp;<br/> </label>
                                        <input
                                            className = "form-control"
                                            name="experience_in_years"
                                            onChange={this.handleChange}
                                            placeholder="In Years"
                                            type="text"
                                            value={this.state.data.experience_in_years}
                                        />
                                        <span className="form-error">
                                            {this.validator.message('Experience', this.state.data.experience_in_years, 'required|integer|min:1,num|max:35,num')}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="singel-form form-group">
                                        <label>Resume: </label>
                                        <input
                                            className="form-control"
                                            name= "resume"
                                            onChange={this.handleChange}
                                            type="file"
                                        />
                                    </div>
                                </div>

                                <p className="form-message"></p>
                                <div className="col-md-12">
                                    <div className="singel-form">
                                        <span className="form-error">
                                            {this.state.errorsMsg}
                                        </span>
                                        <span className="text-success">
                                            {this.state.successMsg}
                                        </span><br /><br />
                                        <button
                                            className="main-btn"
                                            onClick={this.handleSubmit}
                                            type="submit"
                                        >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddJoinWithUs.propTypes = {
    onSetJoinUs: PropTypes.func.isRequired,
};
