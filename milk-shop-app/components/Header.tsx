import { colors } from '@/helpers/colors';
import styled from 'styled-components';

export const Header = () => {
  return <HeaderText> The milk store </HeaderText>;
};

const HeaderText = styled.h1`
  text-transform: uppercase;
  text-align: center;
  color: ${colors.darkPink};
  letter-spacing: 5px;
`;