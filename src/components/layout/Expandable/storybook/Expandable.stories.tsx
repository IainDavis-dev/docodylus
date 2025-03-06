import type { Meta, StoryObj } from '@storybook/react';
import Lorem from '@dummies/boilerplate/lorem_ipsum.mdx';
import { JSX } from 'react';
import Expandable from '../Expandable';
import type { ExpandablePropsType } from '../Expandable';

const render = (args: ExpandablePropsType): JSX.Element => {
  const { startExpanded, expandPrompt, collapsePrompt } = args;
  return (
    <Expandable
      startExpanded={startExpanded}
      expandPrompt={expandPrompt}
      collapsePrompt={collapsePrompt}
    >
      <Lorem />
    </Expandable>
  );
};

const meta: Meta<typeof Expandable> = {
  title: 'Custom Components/Expandable',
  component: Expandable,
  parameters: {
    docs: {
      title: 'About Expandable',
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  argTypes: {
    startExpanded: {
      control: 'boolean',
      description: 'Should the section be expanded when the page first loads?',
    },
    expandPrompt: {
      control: 'text',
      description: 'The text to use when prompting the user to expand the region and reveal the hidden content',
      table: {
        defaultValue: {
          summary: '"show more..."',
          detail: 'Determined by i18n, varies by locale',
        },
      },
    },
    collapsePrompt: {
      control: 'text',
      description: 'The text to use when prompting the user to collapse the region and hide the revealed content',
      table: {
        defaultValue: {
          summary: '"show less"',
          detail: 'Determined by i18n, varies by locale',
        },
      },
    },
  },
  render,
};

export default meta;
type Story = StoryObj<typeof Expandable>;

export const Default: Story = {
  args: {},
};

export const PreExpanded: Story = {
  args: {
    startExpanded: true,
  },
};

export const CustomExpandCollapsePrompt: Story = {
  name: 'Customizable Expand/Collapse Prompts',
  args: {
    expandPrompt: 'Click for more details (customized expand prompt)',
    collapsePrompt: 'Hide details (customized collapse prompt)',
  },
};

const nestedContentStyle = {
  color: 'orange',
  fontStyle: 'italic',
  fontWeight: 900,
};
export const Nested: Story = {
  name: 'Nested Expandable Sections',
  render: () => (
    <Expandable startExpanded>
      <Lorem />
      <Expandable startExpanded>
        <span style={nestedContentStyle}>Nested expanded content</span>
      </Expandable>
    </Expandable>
  ),
};

export const BrokenTest: Story = {
  name: 'Broken Test Component',
  render: () => (
    <Expandable startExpanded expandPrompt="Show more" collapsePrompt="Show less">
      <p>Outer expandable content</p>
      <Expandable startExpanded expandPrompt="Show nested" collapsePrompt="Hide nested">
        <p>Nested expandable content</p>
      </Expandable>
    </Expandable>
  ),
};
