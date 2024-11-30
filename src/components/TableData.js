import React from "react";

function TableData({ data }) {
  if (!data || data.length === 0) {
    return( 
    <p className="text-center">No data available</p>
  );
  }
  const headers = Object.keys(data[0]);
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
        
          <table className="table table-striped table-bordered table-hover text-center">
            <thead className="table-primary">
              <tr>
                {headers.map((header) => (
                  <th key={header}>
                  {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header}>
                    {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableData;