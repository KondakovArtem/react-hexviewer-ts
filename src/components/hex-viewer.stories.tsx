import React from "react";
import { Story, Meta } from "@storybook/react";

import { HexViewer, HexViewerProps } from "./hex-viewer";
import './scss/hex-viewer.scss';

export default {
  title: "Example/HexViewer",
  component: HexViewer,
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<HexViewerProps> = (args) => <HexViewer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    hex: '9f95fa',
    rowLength: 16,
    setLength: 4

  //   primary: true,
  //   label: "Button",
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   //   label: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   //   size: "large",
//   //   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   //   size: "small",
//   //   label: "Button",
// };
