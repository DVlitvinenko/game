import type { Meta, StoryObj } from "@storybook/react";

import SelectDifficulty from "../SelectDifficulty";

const meta = {
  component: SelectDifficulty,
} satisfies Meta<typeof SelectDifficulty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isVisible: true, onChange: () => {}, onClear: () => {} },
};
