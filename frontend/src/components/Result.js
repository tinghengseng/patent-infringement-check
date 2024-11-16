import React from "react";
import ReactMarkdown from 'react-markdown';

const Result = (results, downloadReport) => {
    return(
<div>
  {results.results.map((item, index) => (
    <div key={index} className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Product: {item.product}</h5>
              <ReactMarkdown>{item.reason}</ReactMarkdown>
              {/* <p className="card-text">{item.reason}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
  {results.results && results.results.length > 0 && (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-8">
          <button 
            className="btn btn-primary"
            onClick={results.handleDownload}
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  )}
</div>
    )
}

export default Result