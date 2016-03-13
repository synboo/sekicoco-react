var React = require('React');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var Option = React.createClass({
    render: function() {
        return (
            <option value={this.props.value}>{this.props.value}</option>
        );
    }
});

var Select = React.createClass({

    handleChange: function(event) {
        var count = Number(event.target.value);
        this.props.onCountChange({count: count, type: this.props.type});
    },

    render: function() {

        var optionCount = 100;
        var optionItems = [];
        for (var i = 1; i <= optionCount; i++) {
            optionItems.push(<Option key={i} value={i} />)
        }

        var description;
        switch (this.props.type) {
            case 'deskCount':
                description = '1つの机に座れる人数';
                break;
            case 'columnCount':
                description = '机の列数';
                break;
            case 'rowCount':
                description = '机の行数';
                break;
        }

        return (
            <div className="select">
                <span>{description}</span>
                <select name="deskCount" onChange={this.handleChange}>
                    {optionItems}
                </select>
            </div>
        );
    }
});

var Setting = React.createClass({

    handleCountChange: function(data) {
        this.props.onCountChange(data);
    },

    render: function() {

        var selectItems = [ 'deskCount', 'columnCount', 'rowCount' ].map(function(e, i) {
            return ( <Select key={i} type={e} onCountChange={this.handleCountChange} /> );
        }, this);

        return (
            <div className="setting">
                {selectItems}
            </div>
        );
    }
});

var Desk = React.createClass({
    render: function() {
        return (
            <div className="desk">&nbsp;</div>
        )
    }
});

var Table = React.createClass({
    render: function() {
        var deskCount = this.props.deskCount;
        var deskItems = _.fill((new Array(deskCount)), 0).map(function(e, i) {
            return <Desk key={i} />
        }, this);
        return (
            <div className="table">{deskItems}</div>
        );
    }
});

var Row = React.createClass({
    render: function() {
        var tableItems = _.fill((new Array(this.props.columnCount)), 0).map(function(e, i) {
           return <Table key={i} deskCount={this.props.deskCount} />
        }, this);
        return (
            <div className="row">
                {tableItems}
            </div>
        );
    }
});

var Zaseki = React.createClass({
    render: function() {
        var rowCount = this.props.rowCount;
        var rowItems = _.fill((new Array(rowCount)), 0).map(function(e, i) {
            return <Row key={i} value={i} deskCount={this.props.deskCount} columnCount={this.props.columnCount} />
        }, this);

        return (
            <div className="zaseki">
                {rowItems}
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            deskCount: 1,
            columnCount: 1,
            rowCount: 1
        };
    },

    /**
     * @param data { type: 'deskCount', count: 1 }
     */
    handleCountChange: function (data) {
        var state = this.state;
        switch (data.type) {
            case 'deskCount':
                state.deskCount = data.count;
                break;
            case 'columnCount':
                state.columnCount = data.count;
                break;
            case 'rowCount':
                state.rowCount = data.count;
                break;
        }
        this.setState(state);
    },

    render: function() {
        return (
            <div className="app">
                <Setting onCountChange={this.handleCountChange} />
                <Zaseki deskCount={this.state.deskCount} columnCount={this.state.columnCount} rowCount={this.state.rowCount} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
