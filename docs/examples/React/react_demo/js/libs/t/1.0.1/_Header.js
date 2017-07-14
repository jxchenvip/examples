const {Link} = require('react-router');
const Nav = require('./_nav.js');
const PubSub = require('./_pubsub.js');


const cc = {
    getDefaultProps: function () {
        return {
            lbtn: '返回',
            rbtn: '菜单',
            title: '页面标题',
            href: 'javascript:;'
        };
    },
    lBtnHandler: function (e) {
        const {href} = this.props;
        if ('javascript:;' === href || '#javascript:;' === href) {
            window.history.go(-1);
            e.preventDefault();
        }
    },
    rBrnHandler: function () {
        PubSub.publish('NAV_POP', null, { open: true });
    },
    render: function () {
        const {lbtn, rbtn, title, href} = this.props;
        return (
            <div>
                <header className="header">
                    <Link className="back" to={href} onClick={this.lBtnHandler}>{lbtn}</Link>
                    <h1>{title}</h1>
                    <span className="menu" onClick={this.rBrnHandler}>{rbtn}</span>
                </header>
                <Nav />
            </div>
        );
    }
};
const Header = React.createClass(cc);

module.exports = Header;