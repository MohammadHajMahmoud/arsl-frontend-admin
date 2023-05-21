import { ClassNames } from "@emotion/react";
import React from "react";
export const displayLayerProps = (layer) => {
  if (layer.type == "LSTM") {
    return (
        <>
        <tr style={{ backgroundColor: 'lightgray' }}>
          <th style={{ fontWeight: 'bold' }}>Type</th>
          <th style={{ fontWeight: 'bold' }}>Units</th>
          <th style={{ fontWeight: 'bold' }}>Return Sequence</th>
        </tr>
        <tr>
          <td>{layer.type}</td>
          <td>{layer.units}</td>
          <td style={{ color: layer.return_sequence ? 'green' : 'red' }}>
            {layer.return_sequence ? 'True' : 'False'}
          </td>
        </tr>
      </>
      
    );
  } else if (layer.type == "Dropout") {
    return (
        <>
        <tr style={{ backgroundColor: 'lightgray' }}>
          <th style={{ fontWeight: 'bold' }}>Type</th>
          <th style={{ fontWeight: 'bold' }}>dropout rate</th>
        </tr>
        <tr>
          <td>{layer.type}</td>
          <td>{layer.dropout_rate}</td>
        </tr>
      </>
      
    );
  } else if (layer.type == "Dense") {
    return  <>
    <tr style={{ backgroundColor: 'lightgray' }}>
      <th style={{ fontWeight: 'bold' }}>Type</th>
      <th style={{ fontWeight: 'bold' }}>Units</th>
    </tr>
    <tr>
      <td>{layer.type}</td>
      <td>{layer.units}</td>
    </tr>
  </>
  } else return (<>
    <tr style={{ backgroundColor: 'lightgray' }}>
      <th style={{ fontWeight: 'bold' }}>Type</th>
    </tr>
    <tr>
      <td>{layer.type}</td>
    </tr>
  </>);
};
