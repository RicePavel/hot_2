var React = require('react');
var City = require('./City.jsx');

class Vote extends React.Component {
    render() {
        return(
                <div>
                    <City name={this.props.voteData[0].name} country={this.props.voteData[0].country} /> 
                    <City name={this.props.voteData[1].name} country={this.props.voteData[1].country} /> 
                </div>
        );
    }
}

module.exports = Vote;
