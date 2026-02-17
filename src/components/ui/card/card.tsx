'use client';

import React, { type CSSProperties, type ReactNode, forwardRef } from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'elevated' | 'minimal' | 'gradient' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  backgroundColor?: string;
  textColor?: string;
  headerBackground?: string;
  footerBackground?: string;
  orientation?: 'vertical' | 'horizontal';
  animationDelay?: number;
};

const sizeMap = {
  sm: { padding: 'p-3', headerPadding: 'px-3 py-2', footerPadding: 'px-3 py-2' },
  md: { padding: 'p-4', headerPadding: 'px-4 py-3', footerPadding: 'px-4 py-3' },
  lg: { padding: 'p-6', headerPadding: 'px-6 py-4', footerPadding: 'px-6 py-4' },
};

const variantStyles = {
  default: 'bg-card text-card-foreground border border-border shadow-sm',
  elevated: 'bg-card text-card-foreground shadow-lg border border-border/30',
  minimal: 'bg-transparent text-foreground border border-border/50',
  gradient:
    'bg-gradient-to-br from-card to-secondary text-card-foreground shadow-md border border-border/40',
  dark: 'bg-primary text-primary-foreground shadow-lg',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      header,
      children,
      footer,
      variant = 'default',
      size = 'md',
      interactive = false,
      className = '',
      backgroundColor,
      textColor,
      headerBackground,
      footerBackground,
      orientation = 'vertical',
      animationDelay = 0,
      style,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = sizeMap[size];
    const variantClass = variantStyles[variant];

    const customStyle: CSSProperties = {
      ...style,
      animationDelay: `${animationDelay}ms`,
    };

    if (backgroundColor) {
      customStyle.backgroundColor = backgroundColor;
    }

    if (textColor) {
      customStyle.color = textColor;
    }

    const containerClass = `
      rounded-lg
      transition-all
      duration-300
      ease-out
      ${variantClass}
      ${interactive ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}
      ${className}
    `.trim();

    return (
      <div ref={ref} className={containerClass} style={customStyle} {...props}>
        {header && (
          <div
            className={`
              border-b border-border/30
              ${sizeClasses.headerPadding}
              ${headerBackground ? '' : 'bg-opacity-50'}
              transition-colors
              duration-200
            `}
            style={headerBackground ? { backgroundColor: headerBackground } : undefined}
          >
            {typeof header === 'string' ? (
              <h3 className="text-lg font-semibold leading-tight">{header}</h3>
            ) : (
              header
            )}
          </div>
        )}

        <div className={sizeClasses.padding}>{children}</div>

        {footer && (
          <div
            className={`
              border-t border-border/30
              ${sizeClasses.footerPadding}
              flex
              ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
              gap-3
              transition-colors
              duration-200
            `}
            style={footerBackground ? { backgroundColor: footerBackground } : undefined}
          >
            {footer}
          </div>
        )}
      </div>
    );
  },
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 ${className}`} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', ...props }, ref) => (
    <h2
      ref={ref}
      className={`text-2xl font-bold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...props }, ref) => (
  <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => <div ref={ref} className={className} {...props} />,
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex items-center gap-3 ${className}`} {...props} />
  ),
);

CardFooter.displayName = 'CardFooter';
