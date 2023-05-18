import { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  ContentText,
  DetailsContainer,
  HeaderTextContainer,
  PuppyContentContainer,
  PuppyHeaderContainer,
} from '../helpers/puppiesContentStyle';
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
  const [newAllergies, setNewAllergies] = useState(puppy.allergies);
  const [newFavouriteFood, setNewFavouriteFood] = useState(puppy.favFood);
  const [newFavouriteToy, setNewFavouriteToy] = useState(puppy.favToy);
  const [newIsSpayed, setNewIsSpayed] = useState(puppy.spayed);
  const [newAbout, setNewAbout] = useState(puppy.about);

  const handleImageChange = async () => {
    setNewImage(await fetchImage(newBreed));
  };

  return (
    <PuppyContentContainer>
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
            <Button type="button" onClick={handleImageChange} hideOnBigScreen>
              Get new image
            </Button>
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
            <Button type="button" onClick={handleImageChange} hideOnSmallScreen>
              Get new image
            </Button>
          </HeaderTextContainer>
        </PuppyHeaderContainer>
        <DetailsContainer>
          <DetailsLabel>Allergies:</DetailsLabel>
          <DetailsInput
            name="allergies"
            type="text"
            placeholder={`Add ${puppy.name}'s allergies`}
            onChange={(e) => setNewAllergies(e.target.value)}
            value={newAllergies}
          />
          <DetailsLabel>Favourite food:</DetailsLabel>
          <DetailsInput
            name="favFood"
            type="text"
            placeholder={`Add ${puppy.name}'s favourite food`}
            onChange={(e) => setNewFavouriteFood(e.target.value)}
            value={newFavouriteFood}
          />
          <DetailsLabel>Favourite toy:</DetailsLabel>
          <DetailsInput
            name="favToy"
            type="text"
            placeholder={`Add ${puppy.name}'s favourite toy`}
            onChange={(e) => setNewFavouriteToy(e.target.value)}
            value={newFavouriteToy}
          />
          <DetailsLabel>Spayed/Castrated</DetailsLabel>
          <DetailsInput
            name="spayed"
            type="text"
            placeholder="Yes/No"
            onChange={(e) => setNewIsSpayed(e.target.value)}
            value={newIsSpayed}
          />
          <DetailsLabel>About {newName}</DetailsLabel>
          <DetailsTextArea
            name="about"
            placeholder={`Add a description about ${puppy.name}...`}
            onChange={(e) => setNewAbout(e.target.value)}
            value={newAbout}
          />
        </DetailsContainer>
        <ActionButton type="submit" style={{ background: `${colors.green}` }}>
          Save
        </ActionButton>
      </UpdateInfoForm>

      <UpdateInfoForm method="delete" style={{ marginBottom: 30 }}>
        <ActionButton type="submit" delete>
          Delete puppy
        </ActionButton>
      </UpdateInfoForm>
    </PuppyContentContainer>
  );
};

const UpdateInfoForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input`
  font-size: 55px;
  margin-block: 8px;
  box-sizing: border-box;
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

const DetailsLabel = styled.label`
  font-family: system-ui;
  padding-left: 3px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const inputStyle = css`
  border: none;
  margin: 2px;
`;

const DetailsInput = styled.input`
  ${inputStyle}
`;

const DetailsTextArea = styled.textarea`
  ${inputStyle}
`;

const ActionButton = styled(Button)`
  width: 100%;
  align-self: center;
`;
