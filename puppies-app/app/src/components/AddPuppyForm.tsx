import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faPaw,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button, PuppyImage, colors } from '../helpers/theme';
import { fetchImage } from '../helpers/fetchImage';
import { Form } from 'react-router-dom';

export const AddPuppyForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleBreedChange = async () => {
    setImage(await fetchImage(breed));
  };

  const handleSubmit = async () => {
    setShowAddForm(false);
    setName('');
    setBreed('');
    setBirthDate('');
  };

  return (
    <AddPuppyContainer>
      {showAddForm ? (
        <FormContainer>
          <AddInfoForm method="post" onSubmit={handleSubmit}>
            <NameInput
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <FieldContainer>
              <FontAwesomeIcon
                icon={faPaw}
                size="sm"
                style={{ paddingInline: 10 }}
              />
              <DetailsInput
                name="breed"
                type="text"
                placeholder="Breed"
                onChange={(e) => setBreed(e.target.value)}
                onBlur={handleBreedChange}
                value={breed}
                required
              />
            </FieldContainer>
            <FieldContainer>
              <FontAwesomeIcon
                icon={faCakeCandles}
                size="sm"
                style={{ paddingInline: 10 }}
              />
              <DetailsInput
                name="birthdate"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                placeholder="Date of birth"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                required
              />
            </FieldContainer>
            <PuppyImage isLargeImage isMobileAdjusted src={image || '/cover-default.jpg'} />
            {image && <input name="image" type="hidden" value={image} />}
            <AddPuppyButton type="submit">
              Add <b>{name}</b> to the collection
            </AddPuppyButton>
            <AddPuppyButton
              type="button"
              onClick={() => setShowAddForm(false)}
              cancel
            >
              Cancel
            </AddPuppyButton>
          </AddInfoForm>
        </FormContainer>
      ) : null}
      <AddButton
        showAddForm={showAddForm}
        title="Add new puppy"
        onClick={() => {
          showAddForm === false ? setShowAddForm(true) : setShowAddForm(false);
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          size="xl"
          style={{ color: '#402903', paddingRight: 10 }}
        />
        Add New Puppy
      </AddButton>
    </AddPuppyContainer>
  );
};

const AddPuppyContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  position: fixed;
  bottom: 15px;
  align-items: center;
`;

const AddButton = styled.button<{ showAddForm: boolean }>`
  background: ${(props) => (props.showAddForm ? colors.purple : colors.green)};
  border: none;
  max-width: 400px;
  width: calc(100% - 20px);
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  align-self: center;
  color: ${colors.dark};
  font-weight: 700;

  &:hover {
    background: ${colors.blue};
  }
`;

const FormContainer = styled.div`
  display: flex;
  padding: 20px;
  padding-bottom: 10px;
  flex-direction: column;
  max-width: 350px;
  justify-content: center;
  background: #fff;
  border-radius: 15px;
  position: relative;
  background: ${colors.purple};

  @media (max-width: 425px) {
    padding: 20px;
    max-width: 250px;
  }
`;

const AddInfoForm = styled(Form)`
  max-width: 350px;
  flex-direction: column;
  align-items: stretch;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 5px 0;
`;
const NameInput = styled.input`
  border: none;
  margin: 0;
  font-size: 30px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: 3px solid ${colors.green};
    background: #fff;
  }
`;
const DetailsInput = styled.input`
  flex: 1 0 auto;
  border: none;
  margin: 2px;
  margin-bottom: 5px;
  padding: 5px;
  font-size: 16px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);

  &:focus {
    outline: 3px solid ${colors.green};
    background: #fff;
  }
`;

const AddPuppyButton = styled(Button)<{ cancel?: boolean }>`
  background: ${(props) => (props.cancel ? colors.delete : colors.green)};
  width: 100%;
  box-sizing: border-box;
  padding: 8px 0;
  margin: 5px 0;
  font-size: 14px;
`;
