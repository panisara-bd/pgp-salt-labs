import styled, { createGlobalStyle, css } from 'styled-components';

export const colors = {
  bg: '#fbf7f4',
  dark: '#402903',
  lightgray: '#fafafa',
  purple: '#eebfff',
  green: '#caed8e',
  blue: '#b3e5fc',
  delete: '#fcbe4c',
};

export const BodyStyle = createGlobalStyle`
 body {
  padding: 0;
  margin: 0;
  background: ${colors.bg};
 }
`;

export const hideOnSmallScreen = css`
  @media (max-width: 530px) {
    display: none;
  }
`;

export const hideOnBigScreen = css`
  @media (min-width: 531px) {
    display: none;
  }
`;

export const Button = styled.button<{
  delete?: boolean;
  hideOnSmallScreen?: boolean;
  hideOnBigScreen?: boolean;
}>`
  background: ${(props) => (props.delete ? colors.delete : colors.purple)};
  border: none;
  border-radius: 20px;
  padding: 6px 10px;
  margin: 10px;
  margin-bottom: 0;
  width: 180px;
  font-weight: 700px;
  color: ${(props) => (props.delete ? '#dd1a00' : '#8f009b')};

  &:hover {
    background: ${colors.blue};
    cursor: pointer;
  }

  ${(props) => (props.hideOnSmallScreen ? hideOnSmallScreen : undefined)}
  ${(props) => (props.hideOnBigScreen ? hideOnBigScreen : undefined)}
`;

export const PuppyImage = styled.img<{
  isLargeImage?: boolean;
  isMobileAdjusted?: boolean;
}>`
  width: ${(props) => (props.isLargeImage ? '345px' : '198px')};
  height: ${(props) => (props.isLargeImage ? '345px' : '198px')};
  object-fit: cover;
  padding: 5px;
  border-radius: 20px;

  @media (max-width: 530px) {
    width: ${(props) => (props.isMobileAdjusted ? '240px' : '198px')};
    height: ${(props) => (props.isMobileAdjusted ? '240px' : '198px')};
  }
`;
