/** style */
require('./_common.css');
// const ReactDOM = require('react-dom');
/** 框架 */
const {Router, hashHistory, browserHistory, Route, IndexRoute, Link} = require('react-router');

/** web pages */
const Index = require('./_Index.js');
const Detail = require('./_Detail.js');
const Javascript = require('./_Javascript.js');
const Html5 = require('./_Html5.js');
const Css3 = require('./_Css3.js');
const Canvas = require('./_Canvas.js');


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Index} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/javascript" component={Javascript} />
        <Route path="/html5" component={Html5} />
        <Route path="/css3" component={Css3} />
        <Route path="/canvas" component={Canvas} />
    </Router>
    , document.getElementById('app'));
