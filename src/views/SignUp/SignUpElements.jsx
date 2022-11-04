import styled from "styled-components";
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgba(239, 243, 248, 1);
`;

export const Wrapper = styled.div`
  width: 85%;
  max-width: 1250px;
  box-shadow: 0px 4px 14px 0px rgba(15, 49, 32, 0.15);

  // max-wdith:px;
 // height: 400px;
  background: white;
  display: flex;
  margin: 0 auto;
  margin-top: 7rem;
  justify-content: space-between;
  padding: 2rem;
  @media screen and (max-width : 768px){
      flex-direction : column;
      padding : 0;
      width : 100%;
  }
`;

export const RightContent = styled.div`
  //background : green;
  //height : inherit;
  width: 60%;
  //padding : 20px;
  input {
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 4px;
    width: 200px;
    padding: 7px;
    outline: none;
    width: 100%;
  }
  &::placeholder {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
  }
  label {
    display: block;
    padding-bottom: 8px;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
  }
  @media screen and (max-width : 768px){
      width : 100%;
  }
`;

export const LeftContent = styled.div`
  //background : blue;
  padding-left: 20px;
  height: inherit;
  h1 {
    //margin-top: 1rem;
    font-family: Roboto;
    font-size: 30px;
    font-style: normal;
    font-weight: 300;
    line-height: 35px;
    letter-spacing: 0em;
    color: rgba(51, 51, 51, 1);
  }
`;
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  width: 50%;
  margin-top : 1.5rem;
  h2 {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
  }
  p {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    color: rgba(139, 139, 139, 1);
  }
  @media screen and (max-width : 768px){
      width : 90%;
      height : 100%;
      padding: 20px;
  }
`;

export const FlexedItem = styled.div`
display : flex;
flex-direction : space-between;
width : 100%;
.mark__svg {
    padding-right : 20px;
}
@media screen and (max-width : 768px){

}
`
export const FormContainer = styled.div`
  //background : yellow;
  height: 100%;
  width: 500px;
  margin: 0 auto;
  @media screen and (max-width : 768px){
      width : 95%;
  }
`;

export const Button = styled.button`
  background: rgba(39, 174, 96, 1);
  padding: 8px 10px;
  color: white;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  border: none;
  outline: none;
  width: 100%;
  cursor : pointer;
  margin-top : 1rem;
  border-radius : 4px;
`;

export const Form = styled.form`
  display: grid;
  //height: 100%;
  grid-template-columns: repeat(2, 0.5fr);
  row-gap: 20px;
  column-gap: 25px;
  .terms__{
    font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 14px;
letter-spacing: 0em;
padding-top : 10px;
  }
  @media screen and (max-width : 768px){
      //grid-template-columns : repeat(1, 0.5fr)
  }
`;
