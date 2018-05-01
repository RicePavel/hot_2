var React = require('react');
var CityElement = require('./CityElement.jsx');

class GameElement extends React.Component {
   render() {
        var startButton = <button onClick={this.props.startGame} >Start</button>;
        if (this.props.started === true) {
            startButton = '';
        }
        
        var scoreRender = '';
        if (this.props.started === true) {
            scoreRender = 'score: ' + this.props.score;
        }
        
        var head = '';
        if (this.props.started === true) {
            head = <h2>Which city is hotter?</h2>;
            if (this.props.current && this.props.current.result !== undefined) {
                var result = this.props.current.result;
                if (result === 1) {
                    head = <h2 className="green-text" >You WIN!</h2>;
                } else if (result === 0) {
                    head = <h2 className="red-text" >You Loose!</h2>;
                }
            }
        }
        
        var cityElement_1 = '';
        var cityElement_2 = '';
        if (this.props.current) {
            var city_1 = this.props.current.city_1;
            var city_2 = this.props.current.city_2;
            var showTemp = false;
            var clickable = true;
            if (this.props.current.result !== undefined) {
                showTemp = true;
                clickable = false;
            }
            cityElement_1 = <CityElement units={this.props.units} cityNumber="1" hot={city_1.hot} clickable={clickable} selectCity={this.props.selectCity} name={city_1.name} country={city_1.country} temp={city_1.temp} showTemp={showTemp} />;
            cityElement_2 = <CityElement units={this.props.units} cityNumber="2" hot={city_2.hot} clickable={clickable} selectCity={this.props.selectCity} name={city_2.name} country={city_2.country} temp={city_2.temp} showTemp={showTemp} />;
        }
        
        var resultElement = '';
        if (this.props.current && this.props.current.result !== undefined) {
            resultElement = <div>{this.props.current.result}</div>;
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
                    {scoreRender} <br/>
                    {head}
                    <div className="clear" ></div>
                    {cityElement_1}
                    {cityElement_2}
                    <div className="clear" ></div>
                    {nextButton}
                    <div className="clear" ></div>

                </div>
        );
    } 
};

module.exports = GameElement;