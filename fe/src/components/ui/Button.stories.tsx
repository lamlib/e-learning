import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
    title: 'Components/Button',
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;
export const Default: Story = {
    args: {
        variant: 'primary',
    }
};

export const Primary: Story = {
    args: {
        variant: 'primary',
    }
};

export const PrimaryDisabled: Story = {
    args: {
        variant: 'primary',
        disabled: true,
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    }
};

export const SecondaryDisabled: Story = {
    args: {
        variant: 'secondary',
        disabled: true,
    }
};


export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
    }
};

export const TertiaryDisabled: Story = {
    args: {
        variant: 'tertiary',
        disabled: true,
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
    }
};

export const GhostDisabled: Story = {
    args: {
        variant: 'ghost',
        disabled: true,
    }
};

export const DangerPrimary: Story = {
    args: {
        variant: 'danger-primary',
    }
};

export const DangerPrimaryDisabled: Story = {
    args: {
        variant: 'danger-primary',
        disabled: true,
    }
};

export const DangerSecondary: Story = {
    args: {
        variant: 'danger-secondary',
    }
};

export const DangerSecondaryDisabled: Story = {
    args: {
        variant: 'danger-secondary',
        disabled: true,
    }
};

export const DangerTertiary: Story = {
    args: {
        variant: 'danger-tertiary',
    }
};

export const DangerTertiaryDisabled: Story = {
    args: {
        variant: 'danger-tertiary',
        disabled: true,
    }
};

export const DangerGhost: Story = {
    args: {
        variant: 'danger-ghost',
    }
};

export const DangerGhostDisabled: Story = {
    args: {
        variant: 'danger-ghost',
        disabled: true,
    }
};