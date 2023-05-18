import styled from 'styled-components';
import { PuppiesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faBone,
  faCakeCandles,
  faDrumstickBite,
  faPaw,
  faSyringe,
} from '@fortawesome/free-solid-svg-icons';
import {
  ContentText,
  DetailsContainer,
  HeaderTextContainer,
  PuppyContentContainer,
  PuppyHeaderContainer,
} from '../helpers/puppiesContentStyle';
import { PuppyImage } from '../helpers/theme';

type Props = {
  puppy: PuppiesType;
};

export const PuppyContentView = ({ puppy }: Props) => {
  return (
    <PuppyContentContainer>
      <PuppyHeaderContainer>
        <PuppyImage
          isMobileAdjusted
          src={puppy.image || '/cover-default.jpg'}
        />{' '}
        <HeaderTextContainer>
          <NameText>{puppy.name}</NameText>
          <ContentText>
            <FontAwesomeIcon
              icon={faPaw}
              size="sm"
              style={{ paddingInline: 10 }}
            />
            {puppy.breed}
          </ContentText>
          <ContentText>
            <FontAwesomeIcon
              icon={faCakeCandles}
              size="sm"
              style={{ paddingInline: 10, paddingTop: 10 }}
            />
            {puppy.birthdate}
          </ContentText>
        </HeaderTextContainer>
      </PuppyHeaderContainer>
      <DetailsContainer style={{ marginTop: 10 }}>
        <ContentText>
          <FontAwesomeIcon
            icon={faCakeCandles}
            size="sm"
            style={{ paddingInline: 10, paddingTop: 10 }}
          />
          <FieldName>Allergies:</FieldName>
        </ContentText>
        <FieldValue>{puppy.allergies}</FieldValue>

        <ContentText>
          <FontAwesomeIcon
            icon={faDrumstickBite}
            size="sm"
            style={{ paddingInline: 10, paddingTop: 10 }}
          />
          <FieldName>Favourite Food:</FieldName>
        </ContentText>
        <FieldValue>{puppy.favFood}</FieldValue>

        <ContentText>
          <FontAwesomeIcon
            icon={faBone}
            size="sm"
            style={{ paddingInline: 10, paddingTop: 10 }}
          />
          <FieldName>Favourite Toy:</FieldName>
        </ContentText>
        <FieldValue>{puppy.favToy}</FieldValue>

        <ContentText>
          <FontAwesomeIcon
            icon={faSyringe}
            size="sm"
            style={{ paddingInline: 10, paddingTop: 10 }}
          />
          <FieldName>Spayed/Castrated:</FieldName>
        </ContentText>
        <FieldValue>{puppy.spayed}</FieldValue>

        <ContentText>
          <FontAwesomeIcon
            icon={faAddressCard}
            size="sm"
            style={{ paddingInline: 10, paddingTop: 10 }}
          />
          <FieldName>About {puppy.name}:</FieldName>
        </ContentText>
        <FieldValue>{puppy.about}</FieldValue>
      </DetailsContainer>
    </PuppyContentContainer>
  );
};

const NameText = styled.h2`
  font-size: 60px;
  margin: 8px;
  max-width: 200px;
  width: 100%;
`;

const FieldName = styled.span`
  flex-shrink: 0;
`;

const FieldValue = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
  padding-left: 10px;
  font-family: system-ui;
  margin-bottom: 10px;
`;
