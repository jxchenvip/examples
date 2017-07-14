const {Link} = require('react-router');


const cc = {
    getDefaultProps: function () {
        return {
            src: 'http://coding.imooc.com/static/module/wap/class/img/1@2x.jpg'
        };
    },
    render: function () {
        return (
            <div className="banner">
                <img src={this.props.src} />
            </div>
        );
    }
};
const Banner = React.createClass(cc);

module.exports = Banner;



