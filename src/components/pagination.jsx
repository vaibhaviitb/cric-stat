import React, { PropTypes } from 'react';
import _ from 'lodash';
 
const defaultProps = {
    initialPage: 1
}
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        this.setPage(this.props.initialPage);
    }

    componentDidUpdate(prevProps){
        const { items, linesPerPage } = this.props;
        if(!_.isEqual(prevProps.items, items) || prevProps.linesPerPage!==linesPerPage){
            this.setPage(this.props.initialPage); 
        }
    }

    setPage(page) {
        const { items, linesPerPage } = this.props;
        var pager = this.state.pager;
 
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified page
        pager = this.getPager(items.length, page, linesPerPage);
 
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(pageOfItems, pager);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 2
        pageSize = pageSize || 2;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 2) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 5;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        return (
            <nav>
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" href="#" onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" href="#" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className="page-link" href="#" onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" href="#" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" href="#"on onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
 
// Pagination.propTypes = propTypes;
Pagination.defaultProps=defaultProps;
export default Pagination;