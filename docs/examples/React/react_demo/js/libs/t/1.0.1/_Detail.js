const {Router, hashHistory, Route, IndexRoute, Link} = require('react-router');
const Header = require('./_Header.js');
const Banner = require('./_IndexBanner.js');
const Content = require('./_DetailContent.js');
const cc = {
    // componentDidMount: function () {
    //     $.get('/getIndexList', function (result) {
    //         console.log(result)
    //     }.bind(this));
    // },
    render: function () {
        console.log(this.props.params.id);
        return (
            <div className="pageIndex">
                <Header title="详情页" />
                <Banner />
                <Content id={this.props.params.id} />
            </div>
        );
    }
};

const Detail = React.createClass(cc);
module.exports = Detail;



