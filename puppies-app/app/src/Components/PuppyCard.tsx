import styled from 'styled-components';
import { PuppiesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faPaw,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { PuppyImage, colors } from '../helpers/theme';
import { UpdatePuppyForm } from './UpdatePuppyForm';

type Props = {
  puppy: PuppiesType;
};

export const PuppyCard = ({ puppy }: Props) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <CardContainer onClick={() => {}} showUpdateForm={showUpdateForm}>
      <ButtonIcon
        showUpdateForm={showUpdateForm}
        onClick={() => {
          showUpdateForm === false
            ? setShowUpdateForm(true)
            : setShowUpdateForm(false);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} size="xl" />
      </ButtonIcon>

      {showUpdateForm ? (
        <UpdatePuppyForm puppy={puppy} setShowUpdateForm={setShowUpdateForm} />
      ) : (
        <>
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
          <PuppyImage src={puppy.image || '/cover-default.jpg'} />{' '}
        </>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.button<{ showUpdateForm: boolean }>`
  display: flex;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background: #fff;
  border-radius: 15px;
  position: relative;
  background: ${(props) => (props.showUpdateForm ? colors.green : '#fff')};
  font: inherit;
  max-width: 250px;
  width: 100%;
  border: none;

  &:hover,
  &:active {
    border: 2px solid ${colors.dark};
    cursor: pointer;
  }
`;

const NameText = styled.h1`
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

const ButtonIcon = styled.button<{ showUpdateForm: boolean }>`
  background: none;
  border: none;
  position: absolute;
  top: 15px;
  right: 13px;
  color: ${(props) => (props.showUpdateForm ? colors.dark : colors.purple)};

  &:hover {
    color: ${colors.blue};
    cursor: pointer;
  }
`;
