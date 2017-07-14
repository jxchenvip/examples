const {Router, hashHistory, Route, IndexRoute, Link} = require('react-router');


const Content = React.createClass({
    getInitialState: function () {
        return {
            id: 0,
            items: [
                { content: '关于写字板' },
                { content: '关于圆形进度条' },
                { content: '关于日期联动下拉' },
                { content: '关于倒计时' },
                { content: '关于上传图片' },
                { content: '关于图片裁剪' },
                { content: '关于瀑布流' }
            ]
        }
    },
    componentDidMount: function () {
        this.state.id = this.props.id;
        this.setState(this.state);
    },
    // componentWillUnmount: function () {
    //     PubSub.unsubscribe('menupop');
    // },
    render: function () {
        var content = this.state.items[this.state.id].content;
        return (
            <div>{content}</div>
        );
    }
});

module.exports = Content;



