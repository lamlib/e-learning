import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Demo } from './Demo';
import { ArrowRight, Download, Add } from "@carbon/icons-react";

const meta = {
  title: 'UI/Demo',
  component: Demo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demo component theo Enterprise Design System. Component này hỗ trợ nhiều variants, sizes và states khác nhau.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?m=dev',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'ghost',
        'danger-primary',
        'danger-tertiary',
        'danger-ghost',
      ],
      description: 'Variant của Demo - extracted from Figma Enterprise Design System',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Kích thước của Demo',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Demo có chiếm full width không',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Trạng thái loading',
    },
    skeleton: {
      control: 'boolean',
      description: 'Trạng thái skeleton - extracted from Figma',
    },
    children: {
      control: 'text',
      description: 'Nội dung Demo',
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof Demo>;

export const Default: Story = {
  args: {
    children: 'Demo',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Demo',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Demo',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Demo',
  },
};

export const DangerPrimary: Story = {
  args: {
    variant: 'danger-primary',
    children: 'Danger Primary',
  },
};

export const DangerTertiary: Story = {
  args: {
    variant: 'danger-tertiary',
    children: 'Danger Tertiary',
  },
};

export const DangerGhost: Story = {
  args: {
    variant: 'danger-ghost',
    children: 'Danger Ghost',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Demo',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Demo',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Demo',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Demo',
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Demo',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Demo',
  },
};

export const Skeleton: Story = {
  args: {
    skeleton: true,
    children: 'Skeleton Demo',
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Add className="h-4 w-4" />,
    children: 'Add Item',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRight className="h-4 w-4" />,
    children: 'Continue',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Download className="h-4 w-4" />,
    rightIcon: <ArrowRight className="h-4 w-4" />,
    children: 'Download',
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Demo',
  },
  parameters: {
    layout: 'padded',
  },
};

// All Variants - extracted from Figma
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">Standard Variants</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Demo variant="primary">Primary</Demo>
          <Demo variant="secondary">Secondary</Demo>
          <Demo variant="tertiary">Tertiary</Demo>
          <Demo variant="ghost">Ghost</Demo>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">Danger Variants</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Demo variant="danger-primary">Danger Primary</Demo>
          <Demo variant="danger-tertiary">Danger Tertiary</Demo>
          <Demo variant="danger-ghost">Danger Ghost</Demo>
        </div>
      </div>
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Demo size="small">Small</Demo>
      <Demo size="medium">Medium</Demo>
      <Demo size="large">Large</Demo>
    </div>
  ),
};

// All States - extracted from Figma
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">Interactive States</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Demo>Enabled</Demo>
          <Demo disabled>Disabled</Demo>
          <Demo loading>Loading</Demo>
          <Demo skeleton>Skeleton</Demo>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">Hover & Active States</h3>
        <p className="text-xs text-gray-500">
          Hover và Active states được tự động áp dụng khi tương tác với Demo
        </p>
      </div>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Click me',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo có thể tương tác, thử thay đổi các controls ở bên phải.',
      },
    },
  },
};

