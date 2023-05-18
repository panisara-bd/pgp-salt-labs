import { useState } from 'react';
import styled from 'styled-components';
import {
  ContentText,
  HeaderTextContainer,
  PuppyHeaderContainer,
} from '../helpers/puppuiesContentStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faPaw } from '@fortawesome/free-solid-svg-icons';
import { fetchImage } from '../helpers/fetchImage';
import { PuppiesType } from '../types';
import { Form } from 'react-router-dom';
import { Button, PuppyImage, colors } from '../helpers/theme';

type Props = {
  puppy: PuppiesType;
  onSubmit: () => void;
};

export const PuppyContentEdit = ({ puppy, onSubmit }: Props) => {
  const [newName, setNewName] = useState(puppy.name);
  const [newBirthDate, setNewBirthDate] = useState(puppy.birthdate);
  const [newBreed, setNewBreed] = useState(puppy.breed);
  const [newImage, setNewImage] = useState(puppy.image);

  const handleImageChange = async () => {
    setNewImage(await fetchImage(newBreed));
  };

  return (
    <>
      <UpdateInfoForm method="put" onSubmit={onSubmit}>
        <PuppyHeaderContainer>
          <ImageContainer>
            <PuppyImage
              isMobileAdjusted
              src={newImage || '/cover-default.jpg'}
            />
            {newImage && <input name="image" type="hidden" value={newImage} />}
          </ImageContainer>
          <HeaderTextContainer>
            <NameInput
              name="name"
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
            <ContentText>
              <FontAwesomeIcon
                icon={faPaw}
                size="sm"
                style={{ paddingInline: 10 }}
              />
              <DetailsInput
                name="breed"
                type="text"
                onChange={(e) => setNewBreed(e.target.value)}
                value={newBreed}
              />
            </ContentText>
            <ContentText>
              <FontAwesomeIcon
                icon={faCakeCandles}
                size="sm"
                style={{ paddingInline: 10 }}
              />
              <DetailsInput
                name="birthdate"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setNewBirthDate(e.target.value)}
                value={newBirthDate}
              />
            </ContentText>
            <Button type="button" onClick={handleImageChange}>
              Get new image
            </Button>
          </HeaderTextContainer>
        </PuppyHeaderContainer>
        <Button type="submit" style={{background: `${colors.green}`}}>Save</Button>
      </UpdateInfoForm>

      <Form method="delete">
        <Button type="submit" delete>
          Delete puppy
        </Button>
      </Form>
    </>
  );
};

const UpdateInfoForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin-top: 30px;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input`
  font-size: 55px;
  margin: 8px;
  max-width: 200px;
  width: 100%;
  border: none;

  padding: 5px 10px;

  font-family: inherit;
  font-weight: 700;
  border-radius: 6px;
  background: #fff;

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
  background: #fff;

  &:focus {
    outline: 3px solid ${colors.purple};
    background: #fff;
  }
`;
