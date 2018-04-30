var React = require('react');

class City extends React.Component {
    render() {
        return <div className="city">{this.props.name}, <br/> {this.props.country} </div>;
    }
}

module.exports = City;