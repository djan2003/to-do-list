import React, {ChangeEvent,KeyboardEvent, useState} from "react";
// @ts-ignore
import { Button} from "@material-ui/core";

type AddItemsFormPropsType ={
    addItem:(itemTitle:string)=>void
}




const AddItemsForm = (props:AddItemsFormPropsType)=>{
    const[title,setTitle]=useState<string>("")
    const [error,setError]=useState<string|null>(null)
    const addItem=()=>{
        const itemTitle=title.trim();
        if (itemTitle){
            props.addItem(itemTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {   setError(null)
        setTitle(e.currentTarget.value)}
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter") addItem()}
    return(
        <div>
            <input
                onKeyPress={onKeyPress}
                onChange={onChangeHandler}
                value={title}
                className={error?"error":""}
            />

           {/*<button onClick={addItem} >+</button>
            */}
            <Button variant="contained" color="primary" onClick={addItem}>+</Button>
            {error&&<div className={"error-message"}>{error}</div>}
        </div>

    )
}
export default AddItemsForm;