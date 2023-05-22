import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cssFile/neural.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { render } from "@testing-library/react";
import { json } from "react-router";
import { renderInputFields } from "./renderInputeFields";
import { displayLayerProps } from "./displayLayerProp";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function NeuralComponent() {
  const [selectedType, setSelectedType] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [layerList, setLayerList] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [epochsNum, setEpochsNum] = useState(0);

  const handleEpochsNumChange = (event) => {
    setEpochsNum(parseInt(event.target.value));
  };

  const handleItemClick = (item, sourceList) => {
    if (sourceList === "list1") {
      setList1(list1.filter((i) => i !== item));
      setList2([...list2, item]);
    } else {
      setList2(list2.filter((i) => i !== item));
      setList1([...list1, item]);
    }
  };
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios.get(`http://localhost:8080/actions`).then((response) => {
      let l1 = [];
      let l2 = [];
      response.data.forEach((obj) => {
        if (obj.status == "AVAILABLE") {
          l1.push(obj.name);
        } else {
          l2.push(obj.name);
        }
      });
      setList1(l1);
      setList2(l2);
      console.log(list1);
      console.log(list2);
    });
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setInputValues({});
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "number") {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (type === "checkbox") {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(layerList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLayerList(items);
  };
  const handleSubmitLayer = (event) => {
    event.preventDefault();
    if (inputValues.units) {
      let float = parseFloat(inputValues.units);
      inputValues.units = float;
    }
    if (inputValues.dropout_rate) {
      let float = parseFloat(inputValues.dropout_rate);
      inputValues.dropout_rate = float;
    }

    const layerItem = { type: selectedType, ...inputValues };
    if (layerItem.type == "LSTM" && !layerItem.return_sequences) {
      layerItem.return_sequences = false;
    }
    setLayerList((prevList) => [...prevList, layerItem]);
    setSelectedType("");
    setInputValues({});
  };

  const deleteLayer = (index) => {
    setLayerList((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let layer_configs = layerList;
    let actions = list1;
    let epochs_num = epochsNum;
    console.log(layer_configs);
    console.log(actions);
    console.log(epochs_num);
    toast.success('Neural Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="container">
            <ToastContainer />
      <div className="add-layer-con">
        <form onSubmit={handleSubmitLayer}>
          <select
            className="sel-layer"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            <option value="Dropout">Dropout</option>
            <option value="LSTM">LSTM</option>
            <option value="Dense">Dense</option>
            <option value="BatchNormalization">Batch Normalization</option>
          </select>
          <button type="submit" className="add-layer-btn">
            Add Layer
          </button>
        </form>
        <div className="fields-con">
          {renderInputFields(selectedType, inputValues, handleInputChange)}
        </div>
      </div>
      <div className="layers-con">
        <h4 className="head">layers</h4>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="layerList">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {layerList.map((layer, index) => (
                  <Draggable
                    key={index}
                    draggableId={`layer-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <li className="le"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <table className="tbl">
                       <tr className="rl" >
                          <td className="tl">
                          {displayLayerProps(layer)}
                          </td>
                          <td className="flx tl">
                          <button className="del_layer" onClick={() => deleteLayer(index)}>
                              X
                            </button>
                          </td>
                       </tr>

                        </table>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="epoc">
        <label htmlFor="epochsNumInput">Epochs Number:</label>
        <input
        className="epoc_in"
          type="number"
          value={epochsNum}
          onChange={handleEpochsNumChange}
        />
      </div>
      <div className="lists-con">
        
      <div className="list1">
        <h3>Avilable Actions</h3>
        <ul>
          {list1.map((item) => (
            <li className="list-item" key={item} onClick={() => handleItemClick(item, "list1")}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="list2">
        <h3>Unavailable Actions</h3>
        <ul>
          {list2.map((item) => (
            <li className="list-item" key={item} onClick={() => handleItemClick(item, "list2")}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      </div>
      <button className="add-layer-btn create-neural" onClick={handleSubmit}>Create neural</button>
    </div>
  );
}
