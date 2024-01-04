import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
  Portal,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MyModal extends ModalProps {
  onClose(): void;
  isOpen: boolean;
  title: string;
  children: ReactNode;
  buttonText: string;
  onSubmit: () => void;
}

const MyModal = ({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  ...props
}: MyModal) => {
  return (
    <>
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose} {...props}>
          <ModalOverlay />
          <ModalContent maxW="modal.w" h="modal.h" borderRadius="10px">
            <Heading
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="1.6rem"
              bg="pink.300"
              h="modal.header.h"
              borderTopRadius="10px"
              color="white"
            >
              {title}
            </Heading>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                h="modal.button.h"
                w="modal.button.w"
                bg="pink.100"
                onClick={onSubmit}
                mb="28px"
                color="pink.300"
                fontSize="1.4rem"
              >
                {buttonText}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  );
};

export default MyModal;
