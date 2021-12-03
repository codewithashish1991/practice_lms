import { connect } from 'react-redux';
import Page from './../components/pages/';

export function mapStateToProps(state, ownProps) {
    return {
        pageUrl: (
            ownProps.match.params.page_url
        ) ? ownProps.match.params.page_url : '',
    };
}

export default connect(mapStateToProps, null)(Page);
