import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type EditTableSpanPropsType={
    title:string
    changeTitle:(newTitle:string)=>void
}


const EditTableSpan=(props:EditTableSpanPropsType)=>{
    let[editMode,setEditMode] = useState<boolean>(false)
    let[title,setTitle] = useState<string>(props.title)
    const onEditMode=()=> setEditMode(true)
    const offEditMode=()=>{
        setEditMode(false)
    if (title.trim()){
        props.changeTitle(title.trim())
    }
    }
    const changeTitle = (e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)
    return(
        editMode
        ?<input autoFocus onBlur={offEditMode} value={title} onChange={changeTitle}/>
        :<span onDoubleClick={onEditMode}>{props.title}</span>

    )

}
export default EditTableSpan;