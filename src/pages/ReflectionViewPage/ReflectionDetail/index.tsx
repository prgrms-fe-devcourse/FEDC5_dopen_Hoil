// import { usePostDetail } from '@/hooks/usePost';
// import { useParams } from 'react-router-dom';
import TextCard from './TextCard';

const ReflectionDetail = () => {
  //   const { postId } = useParams();
  //   const { _id, title, comments, author, createdAt, content } = usePostDetail({
  //     id: postId!,
  //   });
  const reflectionLists = [
    {
      title: '좋았던 점',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maxime iste vero ex nam iusto ea cumque amet, omnis impedit beatae laudantium ut. Necessitatibus ducimus veniam voluptates, impedit delectus qui!',
    },
    {
      title: '아쉬운 점',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maxime iste vero ex nam iusto ea cumque amet, omnis impedit beatae laudantium ut. Necessitatibus ducimus veniam voluptates, impedit delectus qui!',
    },
    {
      title: '나에게 한마디',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maxime iste vero ex nam iusto ea cumque amet, omnis impedit beatae laudantium ut. Necessitatibus ducimus veniam voluptates, impedit delectus qui!',
    },
  ];
  return (
    <>
      {/* 타이틀 자리 */}
      {reflectionLists.map(({ title, content }) => {
        return <TextCard key={title} header={title} body={content} />;
      })}
    </>
  );
};

export default ReflectionDetail;
