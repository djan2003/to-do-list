import React from 'react';
import {AddItemForm} from "./AddItemForm";


export default {
    title: 'AddItemFormExampleStories',
    component: AddItemForm
    }

    export const AddItemFormBaseExample=(props:any)=>{
    return <AddItemForm addItem={(title:string)=>{alert(title)}}/>
    }