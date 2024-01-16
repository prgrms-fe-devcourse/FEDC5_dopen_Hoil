import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  count: number;
  size?: string;
  maxCount?: number;
  backgroundColor?: string;
  textColor?: string;
  dot?: boolean;
  showZero?: boolean;
}

const Badge = ({
  children,
  count,
  maxCount,
  size = '16px',
  backgroundColor = 'red',
  textColor = 'white',
  dot = false,
  showZero = false,
  ...props
}: BadgeProps) => {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  };

  let badge = null;

  if (count) {
    badge = (
      <Super size={size} style={colorStyle}>
        {maxCount && count > maxCount ? `${maxCount}+` : count}
      </Super>
    );
  } else {
    if (count !== undefined) {
      badge = showZero ? (
        <Super size={size} style={colorStyle}>
          0
        </Super>
      ) : null;
    } else if (dot) {
      badge = (
        <Super size={size} className="dot" style={colorStyle}>
          0
        </Super>
      );
    }
  }

  return (
    <BadgeContainer {...props}>
      {children}
      {count > 0 || (count === 0 && showZero) ? badge : null}
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Super = styled.span<{ size: string }>`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  transform: translate(25%, 25%);
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  font-size: 12px;
  border-radius: 50%;
  color: white;
  background-color: #f44;
  &.dot {
    border-radius: 50%;
  }
`;

export default Badge;
