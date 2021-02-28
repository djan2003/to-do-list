import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {ReactStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
export default {
    title: 'Todolists/AppWithRedux',
    component:AppWithRedux,
    decorators:[ReactStoreProviderDecorator]
} as Meta;

const Template: Story<any> = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};
