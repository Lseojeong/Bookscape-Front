const PROTECTED_PATH_EDIT_ACTIVITY_REGEX = /^\/activity\/[^/]+\/edit(\/.*)?$/;

export const isProtectedPath = (pathname: string): boolean => {
  if (pathname.startsWith('/mypage')) return true;
  if (pathname.startsWith('/activity/new')) return true;
  if (PROTECTED_PATH_EDIT_ACTIVITY_REGEX.test(pathname)) return true;
  return false;
};
