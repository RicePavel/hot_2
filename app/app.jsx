
import thunkMiddleware from 'redux-thunk'

var React = require('react');
var ReactDOM = require('react-dom');
var redux = require("redux");
var Provider = require('react-redux').Provider;
var reducer = require('./reducer.jsx');
var AppView = require('./appview.jsx');

var store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware));

ReactDOM.render(
        <Provider store={store} ><AppView /></Provider>,
        document.getElementById('app')
);

/*

var Provider = require("react-redux").Provider;
var reducer = require('./reducer.jsx');
var AppView = require('./appview.jsx');

var store = redux.createStore(reducer);
*/

/*
var ReactDOM = require('react-dom');
var React = require('react');
var Vote = require('./components/Vote.jsx');
var Hello = require('./components/Hello.jsx');
var $ = require('jquery');

$.ajax({
    url: 'city_list.txt',
    success: function(response) {
        var arr = response.split('\n');
        arr = arr.slice(1);
        var idArray = [];
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            var elemArr = elem.split(' ');
            var id = elemArr[0];
            idArray.push(id);
        }
        var length = idArray.length;
        var number_1 = getRandomInteger(1, length);
        var number_2 = undefined;
        while (number_2 === undefined || number_2 === number_1) {
            number_2 = getRandomInteger(1, length);
        }
        var id_1 = idArray[number_1];
        var id_2 = idArray[number_2];
    },
    error: function(response) {
        alert('error');
    }
});

const voteData = [
    {
        name: "Berlin",
        country : "Germany"
    }, 
    {
        name: "Paris",
        country: "France"
    }
];

ReactDOM.render(
    <Vote voteData={voteData} />,
    document.getElementById("app")
);

function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
*/

