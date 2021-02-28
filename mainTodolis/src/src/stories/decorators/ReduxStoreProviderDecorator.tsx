import {Provider} from "react-redux";
import {store} from "../../redux/store";
import React from "react";


export const ReactStoreProviderDecorator = (storyFn:any)=>{
    return <Provider store={store}>{storyFn()}</Provider>
}