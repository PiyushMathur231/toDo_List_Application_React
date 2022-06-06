import { useEffect, useState } from "react";
import "./style.css";

// Retrieving the list Items
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if(lists){
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setisEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add Items to list Function
  const addItem = () => {
    if(!inputData){
      alert("Please fill in the data")
    } else if (inputData && toggleButton){
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem){
            return {...curElem, name: inputData}
          }
          return curElem;
        })
      );
      setInputData("");
      setisEditItem(null);
      setToggleButton(false);
    } else {
      const myNewItem = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      setItems([...items, myNewItem]);
      setInputData("");
    }
  };

  // Edit item in list
  const editItem = (index) => {
    const item_todo_edit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edit.name);
    setisEditItem(index);
    setToggleButton(true);
  }

  // Delete Items from list Function
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return index !== curElem.id;
    });
    setItems(updatedItems);
  };

  // Remove all items from list
  const removeAll = () => {
    setItems([]);
  }

  // Adding Items in LocalStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo-logo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder="📝 Add Items" className="form-control" value={inputData} onChange={(event) => setInputData(event.target.value)}/>
            {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}/>) : (<i className="fa fa-plus add-btn" onClick={addItem}/>)}
          </div>
          {/* show all items */}
          <div className="showItems">
          {items.map((curElem) => {
            return(
            <div className="eachItem" key={curElem.id}>
              <h3>{curElem.name}</h3>
              <div className="todo-btn">
              <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}/>
              <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}/>
              </div>
            </div>
            )
          })}
          </div>

          {/* remove all items */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
          </div>
        </div> 
      </div>
    </>
  )
}

export default ToDo;