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

export interface MyModalProps extends ModalProps {
  onClose(): void;
  isOpen: boolean;
  title: string;
  children: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const MyModal = ({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onButtonClick,
  ...props
}: MyModalProps) => {
  return (
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
          <ModalBody bg="customBgWhite">{children}</ModalBody>
          <ModalFooter bg="customBgWhite" justifyContent="center">
            <Button
              h="modal.button.h"
              w="modal.button.w"
              bg="pink.100"
              onClick={onButtonClick}
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
  );
};

export default MyModal;
