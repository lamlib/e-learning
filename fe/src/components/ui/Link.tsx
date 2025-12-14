import { cn } from '@/utils/cn';
import { Url } from 'next/dist/shared/lib/router/router';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink> & {
    className?: string,
}

export default function Link({ children, href, className, ...props}: LinkProps )  {
    return <NextLink href={href} className={cn('underline text-blue-600 font-medium hover:text-blue-800', className)} {...props}>
        {children}
    </NextLink>;
}