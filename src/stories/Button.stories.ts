import type { StoryObj, Meta } from '@storybook/html';
import { Button } from '../components/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return Button(args);
  },
  argTypes: {
    name: { control: 'color' },
    type: { control: 'text' },
  },
} satisfies Meta<{ name: string; type: string }>;

export default meta;
type Story = StoryObj<{ name: string; type: string }>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'Foo Bar',
    type: 'submit',
  },
};
