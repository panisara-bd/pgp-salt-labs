import { FormEvent } from 'react';
import styled from 'styled-components';
import { ButtonMain } from './ButtonMain';

type Props = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    setIsNewName: React.Dispatch<React.SetStateAction<boolean>>
    setNewName: React.Dispatch<React.SetStateAction<string>>
    newName: string
}

export const NameChangeForm = ({setShowForm, setIsNewName, setNewName, newName}: Props) => {
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      setShowForm(false);
      setIsNewName(true);
    };

    return (
      <FormContainer onSubmit={handleSubmit}>
        <NameInput
          type="text"
          name="name"
          autoFocus={true}
          value={newName}
          placeholder="Type in new name here"
          onChange={(event) => setNewName(event.target.value)}
        />
        <ButtonMain type="submit">Save</ButtonMain>
      </FormContainer>
    );
  };

  const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const NameInput = styled.input`
  border: none;
  background: rgba(254, 254, 254, 0.5);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Mukta', sans-serif;
  width: 250px;

  @media (max-width: 425px) {
    max-width: 200px;
  }
  @media (max-width: 320px) {
    max-width: 150px;
  }
`;