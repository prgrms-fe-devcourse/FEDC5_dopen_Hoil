import { LOGINID_SAVEKEY } from '@/constants/user';
import { setItem, removeItem } from '@/utils/storage';

export const saveLoginId = <T, U>(isSavedId: T, loginId: U) => {
  if (isSavedId) {
    // 체크박스 체크 시 - 아이디 로컬 스토리지에 저장
    setItem(LOGINID_SAVEKEY, loginId);
  } else {
    // 체크박스 미체크 시 - 아이디 로컬 스토리지에서 삭제
    removeItem(LOGINID_SAVEKEY);
  }
};
