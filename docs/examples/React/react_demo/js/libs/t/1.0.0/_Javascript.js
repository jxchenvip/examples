const {Router, hashHistory, Route, IndexRoute, Link} = require('react-router');
const Header = require('./_Header.js');
const Banner = require('./_IndexBanner.js');
const Content = require('./_DetailContent.js');

const Javascript = React.createClass({
    // componentDidMount: function () {
    //     $.get('/getIndexList', function (result) {
    //         console.log(result)
    //     }.bind(this));
    // },
    render: function () {
        return (
            <div className="pageIndex">
                <Header title="Javascript" />
                <div>Javascript</div>
            </div>
        );
    }
});

module.exports = Javascript;



