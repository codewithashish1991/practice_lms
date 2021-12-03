import React from 'react';
import Breadcrumbs from './../header/breadcrumbs';

export default class ContactUs extends React.Component {
    getContent = (pageUrl) => {
        const fullUrl = `/pages/${pageUrl}`;
        const pages = JSON.parse(localStorage.getItem('pages'));
        if (localStorage.getItem('pages') && pages.length > 0) {
            const content = pages.filter(page => page.url === fullUrl);
            return content[0];
        }
        return '';
    }
    render() {
        const content = this.getContent(this.props.pageUrl);
        const title = (content && content.title) ? content.title : this.props.pageUrl;
        return (
            <div className="main">
                <Breadcrumbs pageName = {title} pageFullName = {title} />
                <section id="contact-page" className="pt-90 pb-120">
                    <div className="container">
                        <div className="row">
                            {(content) ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content.description,
                                    }}></div>
                            ) : (
                                <h1 className= "text-center text-danger">Oops!!! No page found.</h1>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
