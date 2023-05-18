import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { deletePuppy, getPuppy, updatePuppy } from '../helpers/puppiesApi';
import { PuppiesType } from '../types';
import { PuppyContent } from '../components/PuppyContent';

type LoaderData = {
  puppy: PuppiesType;
};

export const loader: LoaderFunction = async ({
  params: { id },
}): Promise<LoaderData> => {
  const puppy = id ? await getPuppy(id) : null;
  if (!puppy) {
    throw new Response('', { status: 404, statusText: 'Not Found' });
  }
  return { puppy };
};

export const action: ActionFunction = async ({ request, params: { id } }) => {
  if (!id) {
    throw new Response('', { status: 404, statusText: 'Not Found' });
  }

  if (request.method.toLowerCase() === 'put') {
    const fields = Object.fromEntries(await request.formData()) as PuppiesType;
    await updatePuppy({ _id: id, ...fields });
    return null;
  }

  if (request.method.toLowerCase() === 'delete') {
    await deletePuppy(id);
    return redirect('/');
  }

  throw new Response('', { status: 405, statusText: 'Method Not Allowed' });
};

export default function PuppyRoute() {
  const { puppy } = useLoaderData() as LoaderData;
  return <PuppyContent puppy={puppy} />;
}
