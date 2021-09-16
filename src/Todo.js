import React, {useState, useEffect} from 'react'
import './style.css'

// localstorage data
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
};

 const Todo = () => {
   const [inputData, setInputData] = useState("");
   const [items, setItems] = useState(getLocalData());
   const [isEditItem, setIsEditItem] = useState("");
   const [toggleButton, setToggleButton] = useState(false);

   // add item function

   const addItem = () => {
     if (!inputData) {
       alert("Fill the data");
     } else if (inputData && toggleButton) {
       setItems(
         items.map((curElem) => {
           if (curElem.id === isEditItem) {
             return { ...curElem, name: inputData };
           }
           return curElem;
         })
       );
       setInputData("");
       setIsEditItem(null);
       setToggleButton(false);
     } else {
       const myNewInputData = {
         id: new Date().getTime().toString(),
         name: inputData,
       };

       setItems([...items, myNewInputData]);
       setInputData("");
     }
   };

   //edit the items
   const editItem = (index) => {
     const item_todo_edited = items.find((curElem) => {
       return curElem.id === index;
     });
     setInputData(item_todo_edited.name);
     setIsEditItem(index);
     setToggleButton(true);
   };

   // delete item function

   const deleteItem = (index) => {
     const updatedItems = items.filter((curElem) => {
       return curElem.id !== index;
     });
     setItems(updatedItems);
   };

   // removeAll function
   const removeAll = () => {
     setItems([]);
   };

   // localstorage
   useEffect(() => {
     localStorage.setItem("mytodolist", JSON.stringify(items));
   }, [items]);

   return (
     <>
       <div className="main-div">
         <div className="child-div">
           <figure>
             <img src="./images/todo.svg" alt="todo logo" />
             <figcaption>Add Your List Here ✌</figcaption>
           </figure>
           <div className="addItems">
             <input
               type="text"
               placeholder="✍ Add Item"
               className="form-control"
               value={inputData}
               onChange={(event) => setInputData(event.target.value)}
             />
             <i className="fa fa-plus add-btn" onClick={addItem}></i>
           </div>
           <div className="showItems">
             {items.map((curElem, index) => {
               return (
                 <div className="eachItem" key={curElem.id}>
                   <h3>{curElem.name}</h3>
                   <div className="todo-btn">
                     <i
                       className="far fa-edit add-btn"
                       onClick={() => editItem(curElem.id)}
                     ></i>
                     <i
                       className="far fa-trash-alt add-btn"
                       onClick={() => deleteItem(curElem.id)}
                     ></i>
                   </div>
                 </div>
               );
             })}
           </div>
           <button
             className="btn effect04"
             data-sm-link-text="Remove All"
             onClick={removeAll}
           >
             <span>Check</span>
           </button>
         </div>
       </div>
     </>
   );
 }

export default Todo;