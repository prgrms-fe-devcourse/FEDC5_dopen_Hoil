import { useForm } from 'react-hook-form';

interface MessageFormValues {
  message: string;
}

interface UseMessageFormProps {
  onSubmit: (message: string) => void;
}

export const useMessageForm = ({ onSubmit }: UseMessageFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<MessageFormValues>();

  const registeredOption = register('message', {
    required: true,
  });

  return {
    registeredOption,
    onSubmit: handleSubmit(({ message }) => onSubmit(message)),
    reset,
    isSubmitting,
    isValid,
  };
};
