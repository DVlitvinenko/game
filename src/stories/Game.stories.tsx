import type { Meta, StoryObj } from "@storybook/react";

import Game from "../Game";

const meta = {
  component: Game,
} satisfies Meta<typeof Game>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: "Test",
    lettersToSelect: ["a", "b", "c"],
    onLetterChose: () => {},
    onSymbolSelect: () => {},
    questString: ["a", "b", "d", "c"],
    selectedSymbolId: -1,
    shifrArray: ["1", "2", "3"],
  },
};
