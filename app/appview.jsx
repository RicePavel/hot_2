var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions.jsx');

var CityElement = require('./components/CityElement.jsx');
var SettingsElement = require('./components/SettingsElement.jsx');
var GameElement = require('./components/GameElement.jsx');


class AppView extends React.Component {
    render() {
       
       var GameRender = <GameElement started={this.props.started} current={this.props.current} score={this.props.score} units={this.props.units} startGame={this.props.startGame} selectCity={this.props.selectCity} nextCity={this.props.nextCity} />;
       var SettingsRender = <SettingsElement setUnits={this.props.setUnits} units={this.props.units} story={this.props.story}  />;
       
       return(
                <div>
                    {GameRender}
                    <hr/>
                    {SettingsRender}
                </div>
        );
       
    }
};

function mapStateToProps(state) {
    return {
        current: state.get("current"),
        started: state.get('started'),
        story: state.get('story'),
        score: state.get('score'),
        units: state.get('units')
    };
}

module.exports = connect(mapStateToProps, actions)(AppView);