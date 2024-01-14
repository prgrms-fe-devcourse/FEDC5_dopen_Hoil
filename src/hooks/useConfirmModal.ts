import { useState, useCallback } from 'react';

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const open = useCallback((onConfirmCallback: () => void) => {
    setOnConfirm(() => onConfirmCallback);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setOnConfirm(null);
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  }, [onConfirm, close]);

  return { isOpen, open, close, handleConfirm };
};
