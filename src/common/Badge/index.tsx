import styled from '@emotion/styled';
import { ReactNode } from 'react';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.span`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  transform: translate(25%, 25%);
  height: 16px;
  width: 16px;
  font-size: 12px;
  border-radius: 50%;
  color: white;
  background-color: #f44;
  &.dot {
    border-radius: 50%;
  }
`;

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
  /* size = '16px', */
  backgroundColor = 'inherit',
  textColor = 'white',
  dot = false,
  showZero = false,
  ...props
}: BadgeProps) => {
  let badge = null;

  const colorStyle = {
    backgroundColor,
    color: textColor,
  };

  /*   const sizeStyle = {
    width: size,
    height: size,
  }; */

  if (count) {
    badge = (
      <Super style={colorStyle}>
        {maxCount && count > maxCount ? `${maxCount}+` : count}
      </Super>
    );
  } else {
    if (count !== undefined) {
      badge = showZero ? <Super style={colorStyle}>0</Super> : null;
    } else if (dot) {
      badge = (
        <Super className="dot" style={colorStyle}>
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

export default Badge;
