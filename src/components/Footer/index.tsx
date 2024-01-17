import { DEFAULT_HEADER_HEIGHT, DEFAULT_WIDTH } from '@/constants/style';
import { Flex, FlexProps } from '@chakra-ui/react';
import {
  MdHome,
  MdOutlineTimer,
  MdOutlineMessage,
  MdPersonOutline,
} from 'react-icons/md';
import TextIconButton from '../common/TextIconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getInteractiveMap } from '@/utils/getInteractiveMap';

const Footer = ({ ...props }: FlexProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentPageName, setCurrentPageName] = useState('');

  const elementsData = [
    {
      icon: MdHome,
      text: '홈',
    },
    {
      icon: MdOutlineTimer,
      text: '타이머',
    },
    {
      icon: MdOutlineMessage,
      text: '게시판',
    },
    {
      icon: MdPersonOutline,
      text: '내정보',
    },
  ];

  const footerIconPath = useMemo<Map<string, string>>(
    () =>
      getInteractiveMap<string, string>(
        new Map([
          ['', '홈'],
          ['timer', '타이머'],
          ['board', '게시판'],
          ['mypage', '내정보'],
        ]),
      ),
    [],
  );

  useEffect(() => {
    setCurrentPageName(pathname?.split('/')?.[1]);
  }, [pathname]);

  const matchedPageNameStyle = (currentPageName: string, iconText: string) => {
    if (footerIconPath.get(currentPageName) === iconText) {
      return {
        iconColor: 'pink.300',
        color: 'pink.300',
      };
    }
    return {};
  };

  return (
    <Flex
      pl="31px"
      pr="31px"
      justify="space-around"
      borderTop="1px solid"
      borderColor="gray.450"
      align="center"
      w={DEFAULT_WIDTH}
      h={DEFAULT_HEADER_HEIGHT}
      shrink="0"
      {...props}
    >
      {elementsData.map(({ icon, text }) => (
        <TextIconButton
          key={text}
          TheIcon={icon}
          textContent={text}
          onClick={() => navigate(`/${footerIconPath.get(text)}`)}
          {...matchedPageNameStyle(currentPageName, text)}
        />
      ))}
    </Flex>
  );
};

export default Footer;
