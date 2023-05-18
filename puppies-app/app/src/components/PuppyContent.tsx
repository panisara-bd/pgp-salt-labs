import { PuppiesType } from '../types';
import { useState } from 'react';
import { PuppyContentEdit } from './PuppyContentEdit';
import { PuppyContentView } from './PuppyContentView';
import { Link } from 'react-router-dom';
import { EditButton } from './EditButton';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../helpers/theme';

type Props = {
  puppy: PuppiesType;
};

export const PuppyContent = ({ puppy }: Props) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  return (
    <>
      <ContentHeader>
        <Back to="/">
          <FontAwesomeIcon icon={faArrowLeft} style={{ paddingRight: 5 }} />
          Back
        </Back>
        <EditButton
          setShowUpdateForm={setShowUpdateForm}
          showUpdateForm={showUpdateForm}
        />
      </ContentHeader>
      {showUpdateForm ? (
        <PuppyContentEdit
          puppy={puppy}
          onSubmit={() => setShowUpdateForm(false)}
        />
      ) : (
        <PuppyContentView puppy={puppy} />
      )}
    </>
  );
};

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  padding-inline: 20px;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
`;

const Back = styled(Link)`
  padding: 10px;
  margin: 0;
  text-decoration: none;
  font-family: sans-serif;
  color: ${colors.dark};

  &:hover {
    color: ${colors.blue};
  }
`;
