import MyModal from '@/components/common/MyModal';
import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MyModal> = {
  component: MyModal,
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: {
      type: 'function',
    },
    title: {
      control: 'text',
    },
    buttonText: {
      control: 'text',
    },
    onButtonClick: {
      type: 'function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyModal>;

const ModalTest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>모달 켜세용</Button>
      <MyModal
        title="테스트 모달 제목"
        isOpen={isOpen}
        onClose={onClose}
        buttonText="누르면 알림창"
        onButtonClick={() => alert('하이')}
      >
        <Text align="center" fontSize="2rem">
          하이 아임내용
        </Text>
      </MyModal>
    </>
  );
};

export const Deafult: Story = {
  render: () => <ModalTest />,
};
