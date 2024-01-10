import { FaUserCircle, FaClipboardList, FaPen } from 'react-icons/fa';

export const MYPAGE_LIST = [
  [
    {
      icon: FaUserCircle,
      title: '회원정보 수정',
      href: '/mypage/account',
    },
  ],
  [
    {
      icon: FaClipboardList,
      title: '내가 작성한 게시글 보기',
      href: '/mypage/myboardlist',
    },
    {
      icon: FaPen,
      title: '내가 작성한 댓글 보기',
      href: '/mypage/mycommentlist',
    },
  ],
];
