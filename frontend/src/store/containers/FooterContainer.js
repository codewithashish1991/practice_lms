import { connect } from 'react-redux';
import Footer from './../components/footer/';
import { getBlocks, getCategories } from './../selectors/';

export function mapStateToProps(state) {
    return {
        blocks: getBlocks(state),
        categories: getCategories(state),
    };
}

export default connect(mapStateToProps, null)(Footer);
