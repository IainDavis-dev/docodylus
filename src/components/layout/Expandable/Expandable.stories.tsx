import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Expandable from './Expandable';
import type { ExpandablePropsType } from './Expandable';
import Lorem from '@dummies/boilerplate/lorem_ipsum.mdx';

const render = (args: ExpandablePropsType) => (
    <>
      <h2>Lorem Ipsum...</h2>
      <Expandable {...args}>
        <div>
          <Lorem/>
        </div>
      </Expandable>
    </>
)

const meta: Meta<typeof Expandable> = {
  title: 'Custom Components/Expandable',
  component: Expandable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startExpanded: {
      control: 'boolean',
      description: 'Should the section be expanded when the page first loads?'
    },
    expandPrompt: {
      control: 'text',
      description: 'The text to use when prompting the user to expand the region and reveal the hidden content'
    },
    collapsePrompt: {
      control: 'text',
      description: 'The text to use when prompting the user to collapse the region and hide the revealed content'
    }
  },
  render
};

export default meta;
type Story = StoryObj<typeof Expandable>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const PreExpanded: Story = {
  args: {
    startExpanded: true
  },
};

export const CustomExpandCollapsePrompt: Story = {
  name: "Customizable Expand/Collapse Prompts",
  args: {
    expandPrompt: 'Click for more details (customized expand prompt)',
    collapsePrompt: 'Hide details (customized collapse prompt)',
  },
}

export const Nested: Story = {
  name: "Nested Expandable Sections",
  render: (args, context) => (
    <>
      <h1>Lorem Ipsum...</h1>
      <Expandable startExpanded>
        <div>
          <Lorem />
        </div>
        <Expandable startExpanded>
          Nested expanded content
        </Expandable>
      </Expandable>
    </>
  )
}

