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

/**
 * 数を変更するセレクトメニューのコンポーネント
 */
var Select = React.createClass({

    handleChange: function(event) {
        var count = Number(event.target.value);
        this.props.onCountChange({count: count, type: this.props.type});
    },

    getDescription: function() {
        switch (this.props.type) {
            case 'deskCount':
                return '1つの机に座れる人数';
            case 'columnCount':
                return '机の列数';
            case 'rowCount':
                return '机の行数';
        }
    },

    render: function() {

        var optionCount = 99;
        var optionItems = _.fill((new Array(optionCount)), 0).map(function(e, i) {
           return <Option key={i+1} value={i+1} />;
        });
        var description = this.getDescription();

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

/**
 * 設定部分のコンポーネント
 */
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

/**
 * 座席の一番小さい単位のコンポーネント。一席分
 */
var Desk = React.createClass({
    render: function() {
        return (
            <div className="desk"></div>
        )
    }
});

/**
 * 複数の机(Deskコンポーネント)を持つことができるテーブル
 */
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

/**
 * 座席の一行分のコンポーネント
 */
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

/**
 * 座席の一番親のコンポーネント
 */
var Zaseki = React.createClass({
    render: function() {
        var rowCount = this.props.rowCount;
        var rowItems = _.fill((new Array(rowCount)), 0).map(function(e, i) {
            return <Row key={i}
                        value={i}
                        deskCount={this.props.deskCount}
                        columnCount={this.props.columnCount} />
        }, this);

        return (
            <div className="zaseki">
                {rowItems}
            </div>
        );
    }
});

/**
 * アプリ全体のコンポーネント。一番親の要素
 */
var App = React.createClass({
    getInitialState: function() {
        return {
            deskCount: 1,
            columnCount: 1,
            rowCount: 1
        };
    },

    setStateCount: function(state, data) {
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
        return state;
    },

    /**
     * @param data { type: 'deskCount', count: 1 }
     */
    handleCountChange: function (data) {
        this.setState(this.setStateCount(this.state, data));
    },

    render: function() {
        return (
            <div className="app">
                <Setting onCountChange={this.handleCountChange} />
                <Zaseki deskCount={this.state.deskCount}
                        columnCount={this.state.columnCount}
                        rowCount={this.state.rowCount} />
            </div>
        );
    }
});

/**
 * Appコンポーネントのレンダリング
 */
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
