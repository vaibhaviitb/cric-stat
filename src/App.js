import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./components/listTable";
import {SelectMessage} from './InnerComponents';
import {tabulizeCompare} from './utils';
import {CompareTable} from './containers/CompareTables'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: null,
      isCompared: false,
      selectedPlayers: [],
      selectedPlayersTabulized: [],
      renderCompare: false,
    };
  }
  componentDidMount(){
    axios.get('/players').then(data=>this.setState({myData: data.data})).catch(e=>alert(e));
  }
  handleCompareSelect=()=>this.setState({renderCompare: true});
  toggleCompare =()=>{
    const { isCompared } = this.state;
    this.setState({isCompared: !isCompared});
  }
  setSelectedRow=row=>{
    const player = this.state.myData.find(data=>data._id===row[0]);
    const {selectedPlayers, selectedPlayersTabulized} = this.state;
    this.setState({
      selectedPlayers: [...selectedPlayers.slice(-1), player],
      selectedPlayersTabulized: [...selectedPlayersTabulized.slice(-1), row]});
  }
  componentDidUpdate=()=>{
  }

  render() {
    const header1 = [
      { label: "S.No.", rowspan: 2 },
      { label: "Name", rowspan: 2 },
      { label: "DOB", rowspan: 2 },
      { label: "Country", rowspan: 2 },
      { label: "Role", rowspan: 2 },
      { label: "Bowling Style", rowspan: 2 },
      { label: "Batting Style", rowspan: 2 },
      { label: "Matches", rowspan: 2 },
      { label: "Fielding Stats", colspan: 2 },
      { label: "Batting Stats", colspan: 11 },
      { label: "Bowling stats", colspan: 10 }
    ];
    const header2 = [
      { label: "Catches" },
      { label: "Stumping" },
      { label: "Innings" },
      { label: "Not Outs" },
      { label: "Runs" },
      { label: "Highest Score" },
      { label: "Average" },
      { label: "BF" },
      { label: "Strike Rate" },
      { label: "100s" },
      { label: "50s" },
      { label: "4s" },
      { label: "6s" },
      { label: "Innings" },
      { label: "Bowls" },
      { label: "Runs" },
      { label: "Wickets" },
      { label: "BBI" },
      { label: "Average" },
      { label: "Econnomy" },
      { label: "BBI" },
      { label: "4W" },
      { label: "5W" }
    ];
    const {isCompared, selectedPlayers, renderCompare, selectedPlayersTabulized, myData} = this.state;
    const data = {
      header1,
      header2,
      body: myData,
    };
    if(!myData) return <div>loading...</div>
    else if(renderCompare){
      const formattedTableData=tabulizeCompare([...header1, ...header2], selectedPlayersTabulized);
      return <CompareTable data={formattedTableData}/>
    } else {
      return(
        <div className="App">
          <h1>Cricket players one day statistics</h1>
          <SelectMessage isCompared={isCompared} selectedPlayers={selectedPlayers} handleCompareSelect={this.handleCompareSelect}/>
          { <button
            type="button"
            class="btn btn-primary float-right"
            onClick={this.toggleCompare}
          >
            {isCompared ? 'Remove Comparison': 'Compare'}
          </button>}
          <Table myData={data} isCompared={isCompared} setSelectedRow={this.setSelectedRow}/>
        </div>
      )
    }
  }
}

export default App;
