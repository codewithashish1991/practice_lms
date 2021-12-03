import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocImg from './../../../assets/images/all-icon/map.png';
import MailImg from './../../../assets/images/all-icon/email.png';
import LogoImg from './../../../assets/images/all-icon/logo.png';

export default class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.account !== prevProps.account) {
            this.setState({ account: this.props.account });
        }
    }

    getBlocks = (varName) => {
        const { blocks } = this.props;
        if (blocks) {
            const content = blocks.filter(block => block.var_name === varName);
            if (content[0]) {
                return content[0].description.replace(/(<([^>]+)>)/gi, '');
            }
        }
        return '';
    }

    render() {
        return (
            <div>
                <div className="header-top d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="header-contact text-lg-left text-center">
                                    <ul>
                                        <li><img src={LocImg} alt="map-icon" /><span>{(this.getBlocks('company_address')) ? this.getBlocks('company_address') : '127/5 Mark street, New york'}</span></li>
                                        <li><img src={MailImg} alt="mail-icon" /><span>{(this.getBlocks('company_email')) ? this.getBlocks('company_email') : 'info@yourmail.com'}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="header-opening-time text-lg-right text-center">
                                    <p><b>Contact Us :</b> {(this.getBlocks('company_contact_number')) ? this.getBlocks('company_contact_number') : '00000000'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-logo-support pt-30 pb-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={LogoImg} width="150" style={{ marginTop: '-29px', marginBottom: '-29px' }} alt="Logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="support-button float-right d-none d-md-block">
                                    <div className="button float-left">
                                        {(this.state.account && this.state.account.username) ? (
                                            <p>
                                                Welcome <Link to="/my-account">{this.state.account.username}</Link> &nbsp;
                                                <button onClick={this.props.onLogout} className="btn btn-primary btn-sm">Logout</button>
                                            </p>
                                        ) : (
                                            <Link to="/student-login" className="btn btn-primary btn-sm">Student Login</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TopHeader.propTypes = {
    account: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
};
