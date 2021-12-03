import React from 'react';
import PropTypes from 'prop-types';
import TopHeader from './top-header';
import Menu from './top-menu';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
        };
    }

    componentDidMount() {
        const data = {
            cat_type: 'COURSE',
            parent_id: 'root',
        };
        this.props.onSetCatList(data);
        this.setStaticBlocks();
        this.getPages();
    }

    setStaticBlocks = () => {
        const blocks = JSON.parse(localStorage.getItem('blocks'));

        if (!blocks) {
            const blockData = {
                content_type: 'BLOCK',
            };
            const result = this.props.onSetBlockContentList(blockData);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const { records } = res.data;
                    localStorage.setItem('blocks', JSON.stringify(records));
                    window.location.reload();
                }
            });
        }
    }

    getPages = () => {
        const pages = JSON.parse(localStorage.getItem('pages'));
        const this1 = this;
        if (!pages) {
            const pageData = {
                content_type: 'PAGE',
            };
            const result = this.props.onSetBlockContentList(pageData);
            result.then((res) => {
                if (res.data && res.data.status === 'success') {
                    const { records } = res.data;
                    localStorage.setItem('pages', JSON.stringify(records));
                    this1.setState({ pages: records });
                }
            });
        } else {
            this1.setState({ pages });
        }
    }

    render() {
        return (
            <header id="header-part">
                <TopHeader
                    account = {this.props.userInfo}
                    onLogout = {this.props.onLogout}
                    blocks = {this.props.staticBlocks}
                />
                <Menu
                    categories = {this.props.categories}
                    pages = {this.state.pages}
                />
            </header>
        );
    }
}

Header.propTypes = {
    categories: PropTypes.array.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSetBlockContentList: PropTypes.func.isRequired,
    onSetCatList: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
};
