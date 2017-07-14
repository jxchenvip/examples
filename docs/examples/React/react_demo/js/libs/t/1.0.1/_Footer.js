const {Link} = require('react-router');

const cc = {
    scrollToTop: function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    render: function () {
        const year = (new Date()).getFullYear();
        return (
            <footer className="footer" onClick={this.scrollToTop}>
                <p>Copyright {year} © <Link to="/">JXCHEN.com</Link>.All Rights Reserved.</p>
            </footer>
        );
    }
};
const Footer = React.createClass(cc);


module.exports = Footer;