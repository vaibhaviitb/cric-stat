import React from "react";

export const SelectMessage = ({ isCompared, selectedPlayers, handleCompareSelect }) => {
  console.log(selectedPlayers);
  if (!isCompared) return null;
  else if (selectedPlayers.length === 0) {
    return <p className='select-comp'><h2>Please select the First player from the table below</h2></p>;
  } else if (selectedPlayers.length === 1) {
    return (
      <p className='select-comp'>
        <h2>Player {selectedPlayers[0].name} selected. Please select the second
        Player</h2>
      </p>
    );
  } else {
      if(selectedPlayers[0]._id===selectedPlayers[1]._id){
          return <h2 className='select-comp'>Player {selectedPlayers[0].name} already selected. Please select a different player</h2>
        }
    return (
      <div className='select-comp'>
        <p><h2>Selected Players: </h2></p>
        <p><h3>Player 1 : {selectedPlayers[0].name}</h3></p>
        <p><h3>Player 2: {selectedPlayers[1].name}</h3></p>
        <p><button type="button" class="btn btn-primary" onClick={e=>handleCompareSelect()}>Start Comparison</button></p>
      </div>
    );
  }
};
