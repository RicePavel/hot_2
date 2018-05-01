var React = require('react');
var countries = require('../countries.jsx');

/*
 * параметры:
 * 
 *  units : string - единицы измерения
 *  name : string - название города
 *  hot : boolean - is hotter city 
 *  country : string - название страны
 *  temp : number - температура 
 *  showTemp : boolean - показывать ли температуру
 */
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
        var fahrTemp = 1.8 * (this.props.temp - 273) + 32;
        fahrTemp = Math.ceil((fahrTemp)*100)/100;
        if (this.props.showTemp === true) {
            var units = 'C';
            if (this.props.units) {
                units = this.props.units;
            }
            if (units === 'C') {
                tempRender = celsTemp + ' C';
            } else if (units === 'F') {
                tempRender = fahrTemp + ' F';
            }
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

module.exports = CityElement;
