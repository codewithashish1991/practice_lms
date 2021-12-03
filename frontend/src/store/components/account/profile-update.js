import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'insertTable',
            '|',
            'undo',
            'redo',
        ],
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative',
        ],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    language: 'en',
};
export default class ProfileUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                first_name: props.account.first_name,
                last_name: props.account.last_name,
                profile_img: props.account.profile_img,
                email: props.account.email,
                username: props.account.username,
                phone: props.account.phone,
                fb_link: props.account.fb_link,
                tw_link: props.account.tw_link,
                gplus_link: props.account.gplus_link,
                linkdin_link: props.account.linkdin_link,
                address: props.account.address,
                short_description: props.account.short_description,
                profile_description: props.account.profile_description,
                users_id: props.account.users_id,
                groups_id: props.account.groups_id,
            },
        };
        this.cancel = this.cancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeProDesc = this.onChangeProDesc.bind(this);
        this.validator = new SimpleReactValidator();
    }

    onChangeProDesc(event, editor) {
        const { data } = this.state;
        const textData = editor.getData();
        data.profile_description = textData;
        this.setState({ data });
    }

    cancel(event) {
        event.preventDefault();
        this.props.updateProfile(this.state.data, false);
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

    handleSubmit(event) {
        event.preventDefault();
        const this1 = this;
        if (this.validator.allValid()) {
            const formData = new FormData();
            formData.append('first_name', this.state.data.first_name);
            formData.append('last_name', this.state.data.last_name);
            formData.append('email', this.state.data.email);
            formData.append('username', this.state.data.username);
            formData.append('phone', this.state.data.phone);
            formData.append('fb_link', this.state.data.fb_link);
            formData.append('tw_link', this.state.data.tw_link);
            formData.append('gplus_link', this.state.data.gplus_link);
            formData.append('linkdin_link', this.state.data.linkdin_link);
            formData.append('address', this.state.data.address);
            formData.append('short_description', this.state.data.short_description);
            formData.append('profile_description', this.state.data.profile_description);
            formData.append('users_id', this.state.data.users_id);
            formData.append('groups_id', this.state.data.groups_id);
            if (this.state.data.image && this.state.data.image.name) {
                formData.append('profile_img', this.state.data.image, this.state.data.image.name);
            }
            const result = this.props.onProfileUpdate(formData);
            this.setState({ errorsMsg: '', successMsg: '' });
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const msg = 'profile updated successfully';
                    this1.props.updateProfile(res.data.record, true);
                    this1.setState({ successMsg: msg });
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
            <div className="reviews-form contact-from">
                <div className="section-title">
                    <h5>Update Profile</h5>
                </div>
                <div className="main-form pt-45">
                    <form id="contact-form" method="post">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>First Name:</label>
                                    <input
                                        name="first_name"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.first_name}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('First name', this.state.data.first_name, 'required|alpha|max:120')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Last Name:</label>
                                    <input
                                        name="last_name"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.last_name}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Last name', this.state.data.last_name, 'required|alpha|max:120')}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Email:</label>
                                    <input
                                        className="form-control"
                                        name= "email"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.email}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Email', this.state.data.email, 'required|email')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Mobile Number:</label>
                                    <input
                                        className="form-control"
                                        name= "phone"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.phone}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Mobile Number', this.state.data.phone, 'required|numeric|min:10|max:12')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Username:</label>
                                    <input
                                        className="form-control"
                                        name= "username"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.username}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Username', this.state.data.username, 'required|min:6|max:16')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Facebook Profile Link:</label>
                                    <input
                                        className="form-control"
                                        name= "fb_link"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.fb_link}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Facebook Profile Link', this.state.data.fb_link, 'url')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Twitter Profile Link:</label>
                                    <input
                                        className="form-control"
                                        name= "tw_link"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.tw_link}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Twitter Profile Link', this.state.data.tw_link, 'url')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="singel-form form-group">
                                    <label>Google Profile Link:</label>
                                    <input
                                        className="form-control"
                                        name= "gplus_link"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.gplus_link}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Google Profile Link', this.state.data.gplus_link, 'url')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Linkdin Profile Link:</label>
                                    <input
                                        className="form-control"
                                        name= "linkdin_link"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.data.linkdin_link}
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Linkdin Profile Link', this.state.data.linkdin_link, 'url')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Profile Picture:</label>
                                    <input
                                        accept="image/png, image/jpeg"
                                        className="form-control"
                                        name= "image"
                                        onChange={this.handleChange}
                                        type="file"
                                    />
                                </div>
                            </div>


                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Address:</label>
                                    <textarea
                                        name="address"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.data.address}
                                    ></textarea>
                                </div>
                            </div>


                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Short Description:</label>
                                    <textarea
                                        name="short_description"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.data.short_description}
                                    ></textarea>
                                </div>
                                <span className="form-error">
                                    {this.validator.message('Short Description', this.state.data.short_description, 'max:250')}
                                </span>
                            </div>

                            <div className="col-md-12">
                                <div className="singel-form form-group">
                                    <label>Profile Description:</label>
                                    <CKEditor
                                        name="profile_description"
                                        editor={ ClassicEditor }
                                        data={this.state.data.profile_description}
                                        onChange={this.onChangeProDesc }
                                    />
                                    <span className="form-error">
                                        {this.validator.message('Profile Description', this.state.data.profile_description, 'required')}
                                    </span>
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
                                    <button type="submit" className="main-btn" onClick={this.cancel}>Cancel</button>&nbsp; &nbsp;
                                    <button type="submit" className="main-btn" onClick={this.handleSubmit}>Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ProfileUpdate.propTypes = {
    account: PropTypes.object.isRequired,
    onProfileUpdate: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

