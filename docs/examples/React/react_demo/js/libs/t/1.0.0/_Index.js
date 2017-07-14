const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const {Router, hashHistory, Route, IndexRoute, Link} = require('react-router');
const Header = require('./_Header.js');
const Banner = require('./_IndexBanner.js');
const List = require('./_IndexList.js');
const Footer = require('./_Footer.js');
const animateTime = 400;

const Index = React.createClass({
    render: function () {
        return (
            <CSSTransitionGroup
                className="animateExample"
                transitionEnterTimeout={animateTime}
                transitionLeaveTimeout={animateTime}
                transitionName="example">
                <div className="pageIndex">
                    <Header title="首页" />
                    <Banner />
                    <List />
                    <Footer />
                </div>
            </CSSTransitionGroup>
        );
    }
});

module.exports = Index;



