import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
export default {
    title: 'AddItemStories',
    component: AddItemForm,
    argTypes:{onClick: {
            description: "пишу сюда какой-то тескст",
        }
        }
    ,
} as Meta;

const Template: Story<any> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem:action("что то написал в экшн")
};
