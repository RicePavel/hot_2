
var Map = require('immutable').Map;

/*
{
	startGame: true,
	current: {
		city_1: {
			id:
			temp:
			name:
			country:
                        hot: 
		},
		city_2: {
			id:
			temp:
			name:
			country:
                        hot: 
		},
		result: 
	}
	story: [
		
	],
	score: 
}
*/

var initialMap = Map({score: 0});

var reducer = function(state = initialMap, action) {
    switch (action.type) {
        case 'START_GAME':
            state = state.set("city_id_1", "12345");
            state = state.set("city_id_2", "45566776");
            return state;
        case 'TEST_AFTER_FIVE':
            state = state.set("city_id_1", "1111");
            state = state.set("city_id_2", "1111");
            return state;
        case 'DONE_SUCCESS':
            var current = action.current;
            state = state.set("current", current);
            state = state.set("started", true);
            return state;
        case 'SELECT_CITY':
            var current = state.get("current");
            var result = 0;
            var num = action.cityNumber;
            var temp_1 = current.city_1.temp;
            var temp_2 = current.city_2.temp;
            if (num === "1") {
                if (temp_1 > temp_2) {
                    result = 1;
                } 
            } else if (num === "2") {
                if (temp_2 > temp_1) {
                    result = 1;
                }
            }
            if (temp_1 > temp_2) {
                current.city_1.hot = true;
            } else {
                current.city_2.hot = true;
            }
            current.result = result;
            var score = state.get("score");
            if (result === 1) {
                score++;
                state = state.set("score", score);
            }
            current = Object.assign({}, current);
            state = state.set("current", current);
            return state;
        case 'NEXT_CITY_SUCCESS':
            var nextCurrent = action.current;
            var prevCurrent = state.get("current");
            var story = state.get("story");
            if (!story) {
                story = [];
            }
            story.push(prevCurrent);
            story = story.slice(0);
            state = state.set("story", story);
            state = state.set("current", nextCurrent);
            return state;
    }
    return state;
};

module.exports = reducer;