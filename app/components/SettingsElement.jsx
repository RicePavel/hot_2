var React = require('react');
var CityElement = require('./CityElement.jsx');
var Link = require('react-router-dom').Link;

var connect = require('react-redux').connect;
var actions = require('../actions.jsx');

class SettingsElement extends React.Component {
    setInitsCelsius() {
        this.props.setUnits('C');
    }
    setUnitsFahrenheit() {
        this.props.setUnits('F');
    }
    render() {
        
        var storyRender = [];
        if (this.props.story) {
            var units = this.props.units;
            var story = this.props.story.slice(0);
            story.reverse();
            storyRender = story.map(function(item, i) {
                var resultElement = '';
                if (item.result === 1) {
                    resultElement = <span className="green-text">V</span>;
                } else {
                   resultElement = <span className="red-text">X</span>; 
                }
                
                return <div key={i} >
                    <CityElement units={units} name={item.city_1.name} hot={item.city_1.hot} country={item.city_1.country} temp={item.city_1.temp} showTemp={true} />
                    <CityElement units={units} name={item.city_2.name} hot={item.city_2.hot} country={item.city_2.country} temp={item.city_2.temp} showTemp={true} />
                    {resultElement}
                    <div className="clear" ></div>
                    <br/>
                </div>;
            });
        }
        
        var UnitsSettings = 
                    <div>
                        <h2>Units</h2>
                        <input type='radio' onChange={this.setInitsCelsius.bind(this)} checked={this.props.units === 'C'} /> Celsius
                        <input type='radio' onChange={this.setUnitsFahrenheit.bind(this)} checked={this.props.units === 'F'} /> Fahrenheit
                    </div>;
        
        return (
            <div>
                <div>
                    <Link to="/">Back</Link>
                </div>
                {UnitsSettings}
                <h2>History:</h2>
                {storyRender}
            </div>
        );
    }
};

/*
module.exports = SettingsElement;
*/

function mapStateToProps(state) {
    return {
        current: state.get("current"),
        started: state.get('started'),
        story: state.get('story'),
        score: state.get('score'),
        units: state.get('units')
    };
}

module.exports = connect(mapStateToProps, actions)(SettingsElement);