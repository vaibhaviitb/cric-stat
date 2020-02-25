import React from "react";

export const CompareTable = ({ data }) => {
  data.shift();
  return (
    <div className="compare-table">
      <h1>Player Comparison</h1>
      <table className="table table-striped table-bordered table-hover">
        <tbody>
          {data.map((row, index) => (
            <tr class>
              {row.map((el, index2) => (
                <td className={index2 === 1 ? "table-dark" : ""}>{el}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
