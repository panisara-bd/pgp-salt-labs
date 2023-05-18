import styled from 'styled-components';
import { PuppiesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faPaw } from '@fortawesome/free-solid-svg-icons';
import { ContentText, HeaderTextContainer, PuppyHeaderContainer } from '../helpers/puppuiesContentStyle';
import { PuppyImage } from '../helpers/theme';

type Props = {
  puppy: PuppiesType;
};

export const PuppyContentView = ({ puppy }: Props) => {
  return (
    <PuppyContentContainer>
      <PuppyHeaderContainer>
      <PuppyImage isMobileAdjusted src={puppy.image || '/cover-default.jpg'} />{' '}
      <HeaderTextContainer>
      <NameText>{puppy.name}</NameText>
      <ContentText>
        <FontAwesomeIcon icon={faPaw} size="sm" style={{ paddingInline: 10 }} />
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
    </PuppyContentContainer>
  );
};

const PuppyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin-top: 30px;
  align-items: center;

`

const NameText = styled.h2`
  font-size: 60px;
  margin: 8px;
  max-width: 200px;
  width: 100%;
`;

