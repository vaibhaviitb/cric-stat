import React from "react";
import Pagination from "./pagination";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      displayData: [],
      linesPerPage: 10
    };
  }

  componentDidMount() {
    this.createTable();
  }
  handleSelect=(row)=>{
    this.props.setSelectedRow(row);
  }
  header=()=>{
      const {header1, header2} = this.props.myData;
      const header1El =this.createTh(header1);
      const header2El =this.createTh(header2);
      return (
        <thead>
            <tr>
                {header1El}
            </tr>
            <tr>
                {header2El}
            </tr>
        </thead>
        );
      
  }
  createTh=(headers)=>headers.map(header=><th rowspan={header.rowspan || 1} colspan={header.colspan || 1}>{header.label}</th>);
  createTableRows = data =>
    data.map((row, index) => (
      <tr>
        {row.map((el, index2)=> {
            let value = (this.props.isCompared && index2===1) ? <a href='#' onClick={e=>this.handleSelect(row[0])}>{el}</a> : el;
            if(index2===0) value= index+1;
            return (
                <td>{value}</td>
              )
        })}
      </tr>
    ));

    formatData=(data)=>{
        return data.map(e=>[
            e.id,
            e.name,
            e.dob,
            e.country,
            e.role,
            e.bowlingStyle,
            e.battingStyle,
            e.odi.matches,
            e.odi.fielding.catches,
            e.odi.fielding.stumpings,
            e.odi.batting.innings,
            e.odi.batting.notOut,
            e.odi.batting.runs,
            e.odi.batting.highestScore,
            e.odi.batting.average,
            e.odi.batting.bf,
            e.odi.batting.strikeRate,
            e.odi.batting['100s'],
            e.odi.batting['50s'],
            e.odi.batting['4s'],
            e.odi.batting['6s'],
            e.odi.bowling.innings,
            e.odi.bowling.bowls,
            e.odi.bowling.runs,
            e.odi.bowling.wickets,
            e.odi.bowling.bestBowlingIndex,
            e.odi.bowling.average,
            e.odi.bowling.economy,
            e.odi.bowling.strikeRate,
            e.odi.bowling['4W'],
            e.odi.bowling['5W'],
            
        ])
    }

  createTable = () => {
    const { myData } = this.props;
    const formattedData = this.formatData(myData.body);
    if (myData) {
      this.setState({ 
          tableData: formattedData,
          tableHeaders: this.header(myData)});
    }
  };

  onChangePage = pageOfItems => {
    this.setState({ displayData: pageOfItems });
  };

  render() {
    const { tableData, displayData, linesPerPage } = this.state;
    if (!(this.props.myData && tableData)) return <div>loading...</div>;

    return (
      <div>
        <div className="table">
          <table className="table table-striped table-bordered table-hover">
            {this.header()}
            <tbody>{this.createTableRows(displayData)}</tbody>
          </table>
        </div>
        <Pagination
          items={tableData}
          onChangePage={this.onChangePage}
          linesPerPage={linesPerPage}
        />
      </div>
    );
  }
}

export default Table;
