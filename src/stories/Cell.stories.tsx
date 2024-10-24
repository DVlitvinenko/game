import type { Meta, StoryObj } from "@storybook/react";

import Cell from "../components/Cell";

const meta = {
  component: Cell,
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "S", type: "green" } };
