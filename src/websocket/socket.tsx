import { useEffect, useState } from "react";

export const Todolist = () => {
    const [list, setList] = useState("");
    const [addlist, setAddList] = useState<string[]>([]);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [count, setCount] = useState(10);

    // const increment = ()=>{
    //     setCount(count + 1);
    // }

    // const decrement = () =>{
    //     if(count >0 ){
    //         setCount(count - 1);
    //     }
    // }

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.target.value);
    };

    // Add item to list
    const handleAdd = () => {
        if (list.trim() !== "") { // Prevent adding empty items
            setAddList((prev) => [...prev, list]);
            setList(""); 
        }
    };

    // Delete item from list
    const handleDelete = (index: number) => {
        setAddList((prev) => prev.filter((_, i) => i !== index));
    };

    // Start editing mode
    const handleEdit = (index: number) => {
        setEdit(true);
        setEditIndex(index);
        setEditValue(addlist[index]);
    };

    // Handle edit input change
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    // Submit edited value
    const handleEditSubmit = () => {
        if (editIndex !== null && editValue.trim() !== "") { // Prevent empty edits
            setAddList((prev) =>
                prev.map((item, index) => (index === editIndex ? editValue : item))
            );
            setEdit(false);
            setEditIndex(null);
        }
    };

    // Cancel editing
    const handleEditCancel = () => {
        setEdit(false);
        setEditIndex(null);
    };
     
    useEffect(()=>{
        if (count === 0) return;
        const interval = setInterval(()=>{
            setCount((prev)=> prev - 1)
        }, 1000);
        return () => clearInterval(interval);
    },[count]);
   
    return (
        <>
            <input 
                placeholder="Write something" 
                type="text" 
                value={list} 
                onChange={handleChange} 
            />
            <button onClick={handleAdd}>Add to list</button>

            <div>
                {addlist.map((item, index) => (
                    <div key={index}>
                        <span><li>{item}</li></span>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </div>
                ))}
            </div>

            {edit && (
                <div>
                    <input
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                    />
                    <button onClick={handleEditSubmit}>Submit</button>
                    <button onClick={handleEditCancel}>Cancel</button>
                </div>
            )}

            <div>
                {/* <button onClick={increment}>+</button> */}
                <span>{count}</span>
                {/* <button onClick={decrement}>-</button> */}
            </div>
        </>
    );
};
