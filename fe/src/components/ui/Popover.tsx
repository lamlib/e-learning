import { Popover } from "radix-ui";

const StandardPopover = () => (
    <Popover.Root>
        <Popover.Trigger>More info</Popover.Trigger>
        <Popover.Portal>
            <Popover.Content>
                Some more info...
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default StandardPopover;