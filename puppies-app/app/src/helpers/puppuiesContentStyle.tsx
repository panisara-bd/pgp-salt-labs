import styled from 'styled-components';

export const PuppyContentContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 500px;
width: 100%;
margin-top: 30px;
align-items: center;

`

export const PuppyHeaderContainer = styled.div`
display: flex;
flex-direction: row;
width: inherit;

@media (max-width: 425px) {
  flex-direction: column;
  max-width: 250px;
}
`

export const HeaderTextContainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 15px;
` 

export const ContentText = styled.p`
margin: 0;
font-family: system-ui;
font-size: 16px;
line-height: 30px;
max-width: 200px;
width: 100%;
`;