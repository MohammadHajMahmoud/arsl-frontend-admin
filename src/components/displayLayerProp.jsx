import { ClassNames } from "@emotion/react";
import React from "react";
export const displayLayerProps = (layer) => {
  if (layer.type == "LSTM") {
    return (
        <>
        <tr className="rl" style={{ backgroundColor: 'lightgray' }}>
          <th className="hl"style={{ fontWeight: 'bold' }}>Type</th>
          <th className="hl" style={{ fontWeight: 'bold' }}>Units</th>
          <th  className="hl" style={{ fontWeight: 'bold' }}>Return Sequence</th>
        </tr>
        <tr className="rl">
          <td className="tl">{layer.type}</td>
          <td  className="tl">{layer.units}</td>
          <td  className="tl" style={{ color: layer.return_sequence ? 'green' : 'red' }}>
            {layer.return_sequence ? 'True' : 'False'}
          </td>
        </tr>
      </>
      
    );
  } else if (layer.type == "Dropout") {
    return (
        <>
        <tr className="rl" style={{ backgroundColor: 'lightgray' }}>
          <th className="hl" style={{ fontWeight: 'bold' }}>Type</th>
          <th className="hl"  style={{ fontWeight: 'bold' }}>dropout rate</th>
        </tr>
        <tr className="rl">
          <td className="tl" >{layer.type}</td>
          <td className="tl" >{layer.dropout_rate}</td>
        </tr>
      </>
      
    );
  } else if (layer.type == "Dense") {
    return  <>
    <tr className="rl" style={{ backgroundColor: 'lightgray' }}>
      <th className="hl" style={{ fontWeight: 'bold' }}>Type</th>
      <th className="hl" style={{ fontWeight: 'bold' }}>Units</th>
    </tr>
    <tr className="rl">
      <td  className="tl" >{layer.type}</td>
      <td className="tl">{layer.units}</td>
    </tr>
  </>
  } else return (<>
    <tr className="rl" style={{ backgroundColor: 'lightgray' }}>
      <th className="hl" style={{ fontWeight: 'bold' }}>Type</th>
    </tr>
    <tr className="rl">
      <td className="tl">{layer.type}</td>
    </tr>
  </>);
};
