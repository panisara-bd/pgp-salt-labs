import styled from 'styled-components';
import { PuppiesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faPaw } from '@fortawesome/free-solid-svg-icons';
import { PuppyImage, colors } from '../helpers/theme';
import { Link } from 'react-router-dom';

type Props = {
  puppy: PuppiesType;
};

export const PuppyCard = ({ puppy }: Props) => {
  return (
    <CardContainer to={puppy._id!}>
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
      <PuppyImage src={puppy.image || '/cover-default.jpg'} />
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
  display: flex;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
  max-width: 210px;
  width: 100%;
  border: 2px solid transparent;
  text-decoration: none;
  color: ${colors.dark};

  &:hover,
  &:active {
    border-color: ${colors.dark};
    cursor: pointer;
  }
`;

const NameText = styled.h2`
  margin: 0;
  font-size: 30px;
  padding-inline: 10px;
  margin-bottom: 10px;
`;

const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 16px;
  line-height: 30px;
`;
