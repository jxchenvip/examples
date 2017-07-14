const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const {Link} = require('react-router');
const animateTime = 1500;
const cz = require('classnames');

function toDouble(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return n + '';
    }
}
function getCreateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = toDouble(date.getMonth());
    var day = toDouble(date.getDate());
    return day + '/' + month + ' ' + year;
}


const cc = {
    getInitialState: function () {
        return {
            showQD: false,
            items: [],
            temps: [
                { id: 0, link: "/detail", time: '08/08 16', innerText: "写字板", top: "true" },
                { id: 1, link: "/detail", time: '07/08 16', innerText: "圆形进度条" },
                { id: 2, link: "/detail", time: '06/08 16', innerText: "日期联动下拉" },
                { id: 3, link: "/detail", time: '05/08 16', innerText: "倒计时" },
                { id: 4, link: "/detail", time: '04/08 16', innerText: "上传图片" },
                { id: 5, link: "/detail", time: '03/08 16', innerText: "图片裁剪" },
                { id: 6, link: "/detail", time: '02/08 16', innerText: "瀑布流" }
            ]
        }
    },
    componentDidMount: function () {
        this.state.temps.forEach(function (item, i) {
            setTimeout(function () {
                if (i == this.state.temps.length - 1) {
                    this.state.showQD = true;
                }
                this.state.items.push(item);
                this.setState(this.state);
            }.bind(this), i * 100);

        }.bind(this))
    },
    render: function () {

        const items = this.state.items.map(function (child, i) {
            return (
                <li key={i}>
                    <Link className="arrow" to={child.link + '/' + child.id }>
                        <span className="time">{child.time || getCreateTime() }</span>
                        {child.innerText}
                    </Link>
                </li>
            );
        }.bind(this));

        const classes = cz({
            'more': true,
            'none': !this.state.showQD
        });

        return (
            <div className="indexList">
                <h2><strong>WEB <span>DEMOS</span></strong></h2>
                <ul>
                    <CSSTransitionGroup
                        className="animateExample"
                        transitionEnterTimeout={animateTime}
                        transitionLeaveTimeout={animateTime}
                        transitionName="example">
                        {items}
                    </CSSTransitionGroup>
                </ul>
                <p className={classes}>敬请期待</p>
            </div>
        );
    }
};
const IndexList = React.createClass(cc);
module.exports = IndexList;



