import React from 'react';

export default class Address extends React.Component {
    getBlocks = (varName) => {
        const { blocks } = this.props;
        if (blocks) {
            const content = blocks.filter(block => block.var_name === varName);
            if (content[0]) {
                return content[0].description;
            }
        }
        return '';
    }

    render() {
        return (
            <div className="col-lg-4">
                <div className="contact-address">
                    <div className="contact-heading">
                        <h5>Address</h5>
                        <p>
                            If you have any further questions,
                            please don’t hesitate to contact me.
                        </p>
                    </div>
                    <ul>
                        <li>
                            <div className="singel-address">
                                <div className="icon">
                                    <i className="fa fa-home"></i>
                                </div>
                                {(this.getBlocks('company_full_address')) ? (
                                    <div
                                        className="cont"
                                        dangerouslySetInnerHTML={{
                                            __html: this.getBlocks('company_full_address'),
                                        }}>
                                    </div>
                                ) : ''}
                            </div>
                        </li>
                        <li>
                            <div className="singel-address">
                                <div className="icon">
                                    <i className="fa fa-phone"></i>
                                </div>
                                <div className="cont">
                                    {(this.getBlocks('company_contact_number')) ? (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: this.getBlocks('company_contact_number'),
                                            }}>
                                        </p>

                                    ) : ''}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="singel-address">
                                <div className="icon">
                                    <i className="fa fa-envelope-o"></i>
                                </div>
                                <div className="cont">
                                    {(this.getBlocks('company_email')) ? (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: this.getBlocks('company_email'),
                                            }}>
                                        </p>

                                    ) : ''}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="singel-address">
                                <div className="icon">
                                    <i className="fa fa-globe"></i>
                                </div>
                                <div className="cont">
                                    {(this.getBlocks('company_website')) ? (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: this.getBlocks('company_website'),
                                            }}>
                                        </p>

                                    ) : ''}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
