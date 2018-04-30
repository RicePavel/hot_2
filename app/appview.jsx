var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions.jsx');
var countries = require('./countries.jsx');

class CityElement extends React.Component {
    onClick() {
        if (this.props.clickable) {
            this.props.selectCity(this.props.cityNumber);
        }
    }
    render() {
        var tempRender = '';
        var countryName = countries[this.props.country];
        var celsTemp = this.props.temp - 273.15;
        celsTemp = Math.ceil((celsTemp)*100)/100;
        if (this.props.showTemp === true) {
            tempRender = celsTemp + ' C';
        }
        var cssClass = "city";
        if (this.props.clickable) {
            cssClass += ' clickable';
        }
        if (this.props.hot) {
            cssClass += ' hot';
        }
        return <div className={cssClass} onClick={this.onClick.bind(this)} >{this.props.name}, <br/> {countryName}, <br/> {tempRender} </div>;
    }
};


class AppView extends React.Component {
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
            cityElement_1 = <CityElement cityNumber="1" hot={city_1.hot} clickable={clickable} selectCity={this.props.selectCity} name={city_1.name} country={city_1.country} temp={city_1.temp} showTemp={showTemp} id={city_1.id} />;
            cityElement_2 = <CityElement cityNumber="2" hot={city_2.hot} clickable={clickable} selectCity={this.props.selectCity} name={city_2.name} country={city_2.country} temp={city_2.temp} showTemp={showTemp} id={city_2.id} />;
        }
        
        var resultElement = '';
        if (this.props.current && this.props.current.result !== undefined) {
            resultElement = <div>{this.props.current.result}</div>;
        }

        var nextButton = '';
        if (this.props.current && this.props.current.result !== undefined) {
            nextButton = <button onClick={this.props.nextCity} >Next city</button>;
        }
        
        var storyRender = [];
        if (this.props.story) {
            storyRender = this.props.story.map(function(item, i) {
                var resultElement = '';
                if (item.result === 1) {
                    resultElement = <span className="green-text">V</span>;
                } else {
                   resultElement = <span className="red-text">X</span>; 
                }
                
                return <div key={i} >
                    <CityElement name={item.city_1.name} hot={item.city_1.hot} country={item.city_1.country} temp={item.city_1.temp} showTemp={true} id={item.city_1.id} />
                    <CityElement name={item.city_2.name} hot={item.city_2.hot} country={item.city_2.country} temp={item.city_2.temp} showTemp={true} id={item.city_2.id} />
                    {resultElement}
                    <div className="clear" ></div>
                    <br/>
                </div>;
            });
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
                    <hr/>
                    <h2>History:</h2>
                    {storyRender}
                </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        current: state.get("current"),
        started: state.get('started'),
        story: state.get('story'),
        score: state.get('score')
    };
}

module.exports = connect(mapStateToProps, actions)(AppView);