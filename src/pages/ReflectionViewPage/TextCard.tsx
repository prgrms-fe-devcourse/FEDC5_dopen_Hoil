import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TextCardProps extends CardProps {
  header: string | ReactNode;
  body: string | ReactNode;
}

const TextCard = ({ header, body, ...props }: TextCardProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <Heading size="xl">{header}</Heading>
      </CardHeader>
      <CardBody>
        <Text size="lg">{body}</Text>
      </CardBody>
    </Card>
  );
};

export default TextCard;
