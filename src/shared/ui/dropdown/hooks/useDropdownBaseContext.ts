import { useContext } from 'react';
import { BaseDropdownContext } from '@/shared/ui/dropdown/context/baseDropdownContext';

/**
 * useDropdownBaseContext
 *
 * Dropdown의 open 상태를 사용하는 커스텀 훅입니다.
 *
 * @returns Dropdown의 열림 상태와 상태 변경 함수
 *
 * @throws BaseDropdownProvider 내부에서 사용하지 않으면 에러를 발생시킵니다.
 */
const useDropdownBaseContext = () => {
  const context = useContext(BaseDropdownContext);

  if (!context) {
    throw new Error('BaseDropdownProvider 내부에서 사용하세요.');
  }

  return context;
};

export default useDropdownBaseContext;
