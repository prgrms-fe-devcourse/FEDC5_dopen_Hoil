import { User } from '@/apis/type';
import { DEFAULT_WIDTH } from '@/constants/style';
import { useAdvice } from '@/hooks/useAdvice';
import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react';

interface LoginProfileProps {
  myInfo: User;
}

const LoginProfile = ({ myInfo }: LoginProfileProps) => {
  // const [advice, setAdvice] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('https://api.adviceslip.com/advice')
  //     .then((res) => setAdvice(res.data.slip.advice))
  //     .catch(() => setAdvice('Hi dopen !'));
  // }, []);

  const { advice } = useAdvice();

  return (
    <Flex cursor="default" alignItems="center" maxW={DEFAULT_WIDTH}>
      <Avatar size="2xl" name="Kola Tioluwani" src={myInfo.image || ''} />
      <Flex direction="column" marginLeft="20px">
        <Text width="fit-content" fontSize="3xl" fontWeight="bold">
          <span style={{ color: '#F88585' }}>{myInfo.username}</span>님
          안녕하세요!
        </Text>
        <Text fontStyle="oblique" fontSize="md">
          {advice || <Spinner />}
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginProfile;
