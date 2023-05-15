import { PuppiesType } from '../types';

type Props = {
    puppy: PuppiesType
}

export const PuppyCard = ({puppy}: Props) => {
  return ( 
  <>
  <h1>
{puppy.name}
  </h1>
  </>
  );
};
