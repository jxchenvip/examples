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
        return (
            <div className="pageIndex">
                <Header title="Html5" />
                <Banner />
                <div>Html5</div>
            </div>
        );
    }
};
const Html5 = React.createClass(cc);

module.exports = Html5;



