import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button, PuppyImage, colors } from '../helpers/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faPaw } from '@fortawesome/free-solid-svg-icons';
import { usePuppies } from '../helpers/PuppiesContext';
import { fetchImage } from '../helpers/fetchImage';
import { deletePuppy, updatePuppy } from '../helpers/puppiesApi';
import { PuppiesType } from '../types';

type Props = {
  puppy: PuppiesType;
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdatePuppyForm = ({ puppy, setShowUpdateForm }: Props) => {
  const [newName, setNewName] = useState(puppy.name);
  const [newBirthDate, setNewBirthDate] = useState(puppy.birthdate);
  const [newBreed, setNewBreed] = useState(puppy.breed);
  const [newImage, setNewImage] = useState(puppy.image);

  const { fetchPuppies } = usePuppies();

  const handleImageChange = async () => {
    setNewImage(await fetchImage(newBreed));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setShowUpdateForm(false);
    await updatePuppy({
      _id: puppy._id,
      name: newName,
      breed: newBreed,
      birthdate: newBirthDate,
      image: newImage,
    });
    fetchPuppies();
  };

  const handleDelete = async () => {
    await deletePuppy(puppy._id!);
    fetchPuppies();
  };

  return (
    <UpdateInfoForm onSubmit={handleSubmit}>
      <NameInput
        type="text"
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
      />
      <FontAwesomeIcon icon={faPaw} size="sm" style={{ paddingInline: 10 }} />
      <DetailsInput
        type="text"
        onChange={(e) => setNewBreed(e.target.value)}
        value={newBreed}
      />
      <FontAwesomeIcon
        icon={faCakeCandles}
        size="sm"
        style={{ paddingInline: 10 }}
      />
      <DetailsInput
        type="date"
        max={new Date().toISOString().split('T')[0]}
        onChange={(e) => setNewBirthDate(e.target.value)}
        value={newBirthDate}
      />
      <Button type="button" onClick={handleImageChange}>
        Get new image
      </Button>
      <PuppyImage src={newImage || '/cover-default.jpg'} />
      <Button type="submit">Save</Button>
      <Button type="button" onClick={handleDelete} delete>
        Delete puppy
      </Button>
    </UpdateInfoForm>
  );
};

const UpdateInfoForm = styled.form`
  width: 200px;
`;

const NameInput = styled.input`
  border: none;
  margin: 0;
  font-size: 30px;
  padding: 5px 10px;
  margin-bottom: 10px;
  width: 150px;
  font-family: inherit;
  font-weight: 700;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);

  &:focus {
    outline: 3px solid ${colors.purple};
    background: #fff;
  }
`;
const DetailsInput = styled.input`
  border: none;
  margin: 2px;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 5px;
  width: 150px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);

  &:focus {
    outline: 3px solid ${colors.purple};
    background: #fff;
  }
`;
