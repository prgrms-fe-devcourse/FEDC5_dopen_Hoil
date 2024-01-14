import { useState, useCallback } from 'react';

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [message, setMessage] = useState('');

  const open = useCallback((onConfirmCallback: () => void, msg: string) => {
    setOnConfirm(() => onConfirmCallback);
    setMessage(msg);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setOnConfirm(null);
    setMessage('');
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  }, [onConfirm, close]);

  return { isOpen, open, close, handleConfirm, message };
};
