import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MyModal {
  title: string;
  children: ReactNode;
  buttonText: string;
  onSubmit: () => void;
}

const MyModal = ({ title, children, buttonText, onSubmit }: MyModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>오픈모달</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            color="black"
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
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
