import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { colors } from '../helpers/theme';

type Props = {
showUpdateForm: boolean;
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditButton = ( {showUpdateForm,setShowUpdateForm}: Props ) => {  
  return (
    <Button
      showUpdateForm={showUpdateForm}
      onClick={() => setShowUpdateForm(!showUpdateForm)}
    >
      <FontAwesomeIcon icon={faPenToSquare} size="sm" />
      {showUpdateForm ? ' Cancel' : ' Edit'}
    </Button>
  );
};

const Button = styled.button<{ showUpdateForm: boolean }>`
  background: ${(props) =>
    props.showUpdateForm ? colors.purple : colors.green};
  border: none;
  max-width: 100px;
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  color: ${colors.dark};
  font-weight: 700;

  &:hover {
    background: ${colors.blue};
  }
`;
