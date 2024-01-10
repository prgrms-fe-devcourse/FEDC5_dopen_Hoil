import React, { useEffect } from 'react';
import {
  Button,
  AlertDialog,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

interface ConfirmProps {
  onCancel: () => void;
  onConfirm: () => void;
  comment?: string;
}

const Confirm = ({ onCancel, onConfirm, comment }: ConfirmProps) => {
  const { isOpen, onOpen } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onCancel}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>확인</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize="1.2rem">{comment}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              fontSize="1.2rem"
              colorScheme="red"
              onClick={() => {
                onConfirm();
              }}
            >
              확인
            </Button>
            <Button ml={3} fontSize="1.2rem" ref={cancelRef} onClick={onCancel}>
              취소
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Confirm;
