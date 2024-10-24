import type { Meta, StoryObj } from "@storybook/react";

import InfoScreen from "../InfoScreen";

const meta = {
  component: InfoScreen,
} satisfies Meta<typeof InfoScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subText: "Test",
    onClick: () => {},
    defaultMsg: "Test",
    infoText: "Test",
    isCelebrationVisible: true,
    isVisible: true,
    buttonText: "Тест",
  },
};
