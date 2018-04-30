
import thunk from 'redux-thunk';

var $ = require("jquery");

var startGame = function() {
    return function(dispatch) {
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
                var API_KEY = '542ffd081e67f4512b705f89d2a611b2';
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/weather?id=' + id_1 + '&appid=' + API_KEY,
                    success: function(response) {
                        var obj = response;
                        var temp_1 = obj.main.temp;
                        var name_1 = obj.name;
                        var country_1 = obj.sys.country;
                        $.ajax({
                           url: 'http://api.openweathermap.org/data/2.5/weather?id=' + id_2 + '&appid=' + API_KEY,
                           success: function(response) {
                              var obj = response;
                              var temp_2 = obj.main.temp;
                              var name_2 = obj.name;
                              var country_2 = obj.sys.country;
                              var current = {
                                    city_1: {
                                       id: id_1,
                                       temp: temp_1,
                                       name: name_1,
                                       country: country_1
                                    },
                                    city_2: {
                                       id: id_2,
                                       temp: temp_2,
                                       name: name_2,
                                       country: country_2
                                    }
                               };
                               dispatch(doneSuccess(current)); 
                           }
                        });  
                    }
                });  
            },
            error: function(response) {
                alert('error');
            }
        });
    }
};

var doneSuccess = function(current) {
    return {
        type: 'DONE_SUCCESS',
        current
    };
};

var selectCity = function(cityNumber) {
    return {
        type: 'SELECT_CITY',
        cityNumber
    };
};

var nextCity = function() {
    return {
        type: 'NEXT_CITY'
    };
}

var nextCitySuccess = function(newCurrent) {
    return {
        type: 'NEXT_CITY_SUCCESS',
        newCurrent
    };
}

function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
 

module.exports = {startGame, nextCity, selectCity};


