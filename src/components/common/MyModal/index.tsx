import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const MyModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>머리입니다</ModalHeader>
            <ModalCloseButton />
            <ModalBody>내용</ModalBody>
          </ModalContent>
        </Modal>
      </Button>
    </>
  );
};

export default MyModal;
