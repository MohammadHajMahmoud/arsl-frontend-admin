// InputFields.jsx
import React from "react";

export const renderInputFields = (selectedType, inputValues, handleInputChange) => {
  if (!selectedType) {
    return null;
  }

  switch (selectedType) {
    case "Dropout":
      return (
        <input
        className="in-neural"
          type="number"
          name="dropout_rate"
          value={inputValues.dropout_rate || ""}
          onChange={handleInputChange}
          placeholder="Dropout Rate"
        />
      );
    case "LSTM":
      return (
        < >
          <input
className="in-neural"
            type="number"
            name="units"
            value={inputValues.units || ""}
            onChange={handleInputChange}
            placeholder="Units"
          />
          <div>
          <input
            type="checkbox"
            name="return_sequences"
            checked={inputValues.return_sequences || false}
            onChange={handleInputChange}
          />
          <label htmlFor="return_sequences">Return Sequences</label>
          </div>
         
        </>
      );
    case "Dense":
      return (
        <input
        className="in-neural"
          type="number"
          name="units"
          value={inputValues.units || ""}
          onChange={handleInputChange}
          placeholder="Units"
        />
      );
    case "BatchNormalization":
      return null;
    default:
      return null;
  }
};