import React, { ReactNode, memo } from 'react';
import { useTransition, animated } from 'react-spring';
import classNames from 'classnames';

import { Icon, IconNames } from '../presentation';

import './StatusBubble.less';

const QUANITITY_SIZES = ['small', 'medium', 'large', 'extraLarge'];

export interface IStatusBubbleProps {
  iconName: IconNames;
  appearance: 'inactive' | 'neutral' | 'info' | 'progress' | 'success' | 'warning' | 'error' | 'archived';
  size: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  quantity?: string | number;
}

const paddingBySize = {
  extraSmall: '4px',
  small: '6px',
  medium: '8px',
  large: '8px',
  extraLarge: '12px',
} as const;

const iconColorByAppearance = {
  inactive: 'neutral',
  neutral: 'neutral',
  info: 'neutral',
  progress: 'neutral',
  success: 'neutral',
  warning: 'dark',
  error: 'dark',
  archived: 'neutral',
} as const;

const inStyles = {
  opacity: 1,
  transform: 'scale(1.0, 1.0)',
};

const outStyles = {
  opacity: 0,
  transform: 'scale(0.8, 0.8)',
};

const transitionConfig = {
  from: outStyles,
  enter: inStyles,
  leave: outStyles,
  config: { mass: 1, tension: 400, friction: 30 },
};

function getQuantityPill({
  appearance,
  size,
  quantity,
}: Pick<IStatusBubbleProps, 'appearance' | 'size' | 'quantity'>): ReactNode {
  // Render quantity text only for size >= small.
  if (quantity && QUANITITY_SIZES.includes(size)) {
    return <span className={classNames(['quantity-pill', 'text-bold', size, `status-${appearance}`])}>{quantity}</span>;
  }

  return null;
}

export const StatusBubble = memo(({ appearance, iconName, size, quantity }: IStatusBubbleProps) => {
  const transitions = useTransition(iconName, null, transitionConfig);
  const quantityPill: ReactNode = getQuantityPill({ appearance, size, quantity });

  return (
    <div className="StatusBubble">
      {transitions.map(({ item, key, props }) => (
        <animated.div className="status-bubble-content" key={key} style={props}>
          <div
            className={classNames(['icon-wrapper', `status-${appearance}`, { 'with-quantity': !!quantityPill }])}
            style={{ padding: paddingBySize[size] }}
          >
            <div className="icon-container">
              <Icon appearance={iconColorByAppearance[appearance]} name={item} size={size} />
            </div>
          </div>

          {quantityPill}
        </animated.div>
      ))}
    </div>
  );
});
