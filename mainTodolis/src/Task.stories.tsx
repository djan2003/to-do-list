import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
export default {
    title: 'Todolists/Task',
    component:Task
} as Meta;
const changeTaskStatusCallback = action("поменяли статус у таски")
const changeTaskTitleCallback = action("поменяли тайтл у таски")
const removeTaskCallBack = action("снесли таску")



const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
const  baseArg={
    changeTaskStatus:changeTaskStatusCallback,
    changeTaskTitle:changeTaskTitleCallback,
    removeTask:removeTaskCallBack
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task:{id:"1",isDone:true,title:"JS"},
    todolistID:"todolistID1"
};

export const TaskIsNoDoneExample = Template.bind({});
TaskIsNoDoneExample.args = {
    ...baseArg,
    task:{id:"1",isDone:false,title:"JS"},
    todolistID:"todolistID1"
};