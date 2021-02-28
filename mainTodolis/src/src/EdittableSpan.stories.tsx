import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
export default {
    title: 'Todolists/EditTableSpan',
    component:EditableSpan,
    argTypes:{
        onChange:{
            description:"Значение ЭдитСпана поменялось"
        },
        value:{
            defaultValue:"HTML",
            description:"Начальное значение ЭдитСпана"
        }
    },
} as Meta;




const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditTableSpane = Template.bind({});
EditTableSpane.args = {
    onChange:action("Значение ЭдитСпана изменилось")
};
