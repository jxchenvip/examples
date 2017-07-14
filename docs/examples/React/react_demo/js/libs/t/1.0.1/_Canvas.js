const {Router, hashHistory, Route, IndexRoute, Link} = require('react-router');
const Header = require('./_Header.js');
const Banner = require('./_IndexBanner.js');
const Content = require('./_DetailContent.js');

const cc = {
    componentDidMount: function () {
    },
    render: function () {
        return (
            <div className="pageIndex">
                <Header title="Canvas" />
                <Banner />
                <div>Canvas</div>
            </div>
        );
    }
};
const Canvas = React.createClass(cc);
module.exports = Canvas;



