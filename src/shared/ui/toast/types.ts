export type ToastType = 'cancel' | 'check' | 'warning';

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};
