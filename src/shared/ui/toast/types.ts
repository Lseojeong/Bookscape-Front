export type ToastType = 'cancel' | 'check' | 'warning' | 'info';

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};
