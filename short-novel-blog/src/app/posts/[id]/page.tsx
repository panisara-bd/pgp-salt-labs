import { getPostById } from '@/helpers/getPosts';

type Props = {
  params: { id: string };
};

export default async function Article({ params }: Props) {
  const id = params.id;
  const post = await getPostById(id);

  return (<div><p>{post.body}</p></div>);
}
