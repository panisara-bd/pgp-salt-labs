import styled from 'styled-components';

export const PuppyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding-inline: 20px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 30px;
`;

export const PuppyHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: inherit;
  align-items: center;

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 530px) {
    align-items: center;
    padding-left: 0;
  }
`;

export const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 16px;
  line-height: 30px;
  width: 100%;
  display: flex;
  align-items: baseline;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
