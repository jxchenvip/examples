const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const {Link} = require('react-router');
const cz = require('classnames');
const PubSub = require('./_pubsub.js');
const __TIME = 400;
const cc = {
    getInitialState: function () {
        return {
            showNav: false,
            open: false,
            temps: [
                { id: 0, link: "/javascript", innerText: "JAVASCRIPT" },
                { id: 1, link: "/html5", innerText: "HTML5" },
                { id: 2, link: "/css3", innerText: "CSS3" },
                { id: 3, link: "/canvas", innerText: "Canvas" },
                { id: 4, link: "/", innerText: "返回首页" }
            ],
            items: []
        }
    },
    updateState: function () {
        this.state.open = true;
        this.state.showNav = true;
        this.state.items = [];
        this.setState(this.state);
        this.state.temps.forEach(function (item, i) {
            setTimeout(function () {
                this.state.items.push(item);
                this.setState(this.state);
            }.bind(this), (i + 4) * 50)
        }.bind(this))
    },
    componentDidMount: function () {
        // 接收菜单按钮广播
        PubSub.subscribe('NAV_POP', this.updateState);
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe('NAV_POP');
    },
    // 阻止滑动事件
    touchMoveHandler: function (e) {
        e.preventDefault();
    },
    clickHandler: function () {
        this.state.showNav = false;
        this.setState(this.state);
        this.timer = setTimeout(function () {
            this.state.open = false;
            this.setState(this.state);
        }.bind(this), __TIME)
    },
    // 阻止事件冒泡
    stopPropagationHandler: function (e) {
        e.stopPropagation();
    },
    render: function () {
        var classes = cz({
            'fixed': true,
            'none': !this.state.open
        });

        var nav = function () {
            return (
                <div className="cNav" onClick={this.stopPropagationHandler}>
                    <h2>JXCHEN</h2>
                    <ul>
                        <CSSTransitionGroup
                            className="animateExample"
                            transitionEnterTimeout={__TIME}
                            transitionLeaveTimeout={__TIME}
                            transitionName="example">
                            {
                                this.state.items.map(function (child, i) {
                                    const {link, innerText} = child;
                                    return (
                                        <li key={i}>
                                            <Link to={link} onClick={this.clickHandler}>{innerText}</Link>
                                        </li>
                                    );
                                }.bind(this))
                            }
                        </CSSTransitionGroup>
                    </ul>
                </div>
            );
        }.bind(this);

        return (
            <div className={classes} onTouchMove={this.touchMoveHandler} onClick={this.clickHandler }>
                <CSSTransitionGroup
                    className="animateExample"
                    transitionEnterTimeout={__TIME}
                    transitionLeaveTimeout={__TIME}
                    transitionName="example">
                    {this.state.showNav ? nav() : ''}
                </CSSTransitionGroup>
            </div>
        );
    }
};
const Nav = React.createClass(cc);
module.exports = Nav;
