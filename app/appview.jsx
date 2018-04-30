var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions.jsx');

class CityElement extends React.Component {
    onClick() {
        this.props.selectCity(this.props.cityNumber);
    }
    render() {
        var temp = '';
        if (this.props.showTemp === true) {
            temp = this.props.temp;
        }
        return <div className="city" onClick={this.onClick.bind(this)} >{this.props.name}, <br/> {this.props.country}, <br/> {temp} </div>;
    }
};


class AppView extends React.Component {
    render() {
        var startButton = <button onClick={this.props.startGame} >Start</button>;
        if (this.props.started === true) {
            startButton = '';
        }
        var cityElement_1 = '';
        var cityElement_2 = '';
        
        if (this.props.current) {
            var city_1 = this.props.current.city_1;
            var city_2 = this.props.current.city_2;
            var showTemp = false;
            if (this.props.current.result !== undefined) {
                showTemp = true;
            }
            cityElement_1 = <CityElement cityNumber="1" selectCity={this.props.selectCity} name={city_1.name} country={city_1.country} temp={city_1.temp} showTemp={showTemp} id={city_1.id} />;
            cityElement_2 = <CityElement cityNumber="2" selectCity={this.props.selectCity} name={city_2.name} country={city_2.country} temp={city_2.temp} showTemp={showTemp} id={city_2.id} />;
        }
        var resultElement = '';
        if (this.props.current && this.props.current.result !== undefined) {
            resultElement = <div>{this.props.current.result}</div>;
        }
        var hist = [];
        if (this.props.hist) {
            hist = this.props.hist;
        }
        var nextButton = '';
        if (this.props.current && this.props.current.result !== undefined) {
            nextButton = <button onClick={this.props.nextCity} >Next city</button>;
        }
        return(
                <div>
                    <div> 
                        {startButton}
                    </div>
                    {cityElement_1}
                    {cityElement_2}
                    {resultElement}
                    <br/>
                    {nextButton}
                </div>
        );
    }
};


function mapStateToProps(state) {
    return {
        current: state.get("current"),
        started: state.get('started')
    };
}

module.exports = connect(mapStateToProps, actions)(AppView);