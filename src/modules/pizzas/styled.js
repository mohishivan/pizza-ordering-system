import styled from "styled-components"


//{{{ Container
export const Container = styled.div`
  height:100vh;
  width:100wh;
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-around;
  justify-content:space-evenly;
`;
//}}}
//{{{ Builder
export const Builder = styled.div`
  flex-basis:66%;
  display:flex;
  flex-flow:column;
`;
//}}}
//{{{ Cart
export const Cart = styled.div`
  flex-basis:26%;
  display:flex;
  flex-flow:column;
`;
//}}}
//{{{ Section
export const Section = styled.div`
  margin:20px 0px 30px 0px;
  width:100%;
  align-self:start;
  justify-self:start;
  h3 {
    font:400 22px Roboto;
    margin:0px 0px;
    border-bottom:1px solid rgba(0,0,0,0.1);
    padding:0px 0px 10px 0px;
    text-align:left;
    position:relative;
    span.count {
      position:absolute;
      color:#aaa;
      right:0px;
    }
  }
  ul {
    margin:0px;
    padding:0px;
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
    li {
      font:300 18px Roboto;
      cursor:pointer;
      list-style:none;
      margin:10px 10px;
      flex-basis:calc(33% - 20px);
      box-sizing:border-box;
      border-radius:3px;
      padding:10px 30px;
      position:relative;
      text-align:left;
      user-select: none;
      &.on {
        background-color:crimson;
        color:#fff;
        border:1px solid transparent;
        font:400 18px Roboto;
      }
      &.off {
        background-color:#fff;
        border:1px solid #eee;
        svg {
          color:#777;
          display:none;
        }
      }
      svg {
        position:absolute;
        top:9px;
        right:10px;
        font-size:24px;
      }
    }
  }
`;
//}}}
//{{{ Panel
export const Panel = styled.div`
  height:100vh;
  overflow:auto;
  box-sizing:border-box;
  padding:20px 30px;
  margin:20px 0px ;
  border-radius:10px;
  background-color:#fff;
  box-shadow:1px 1px 20px rgba(0,0,0,0.1);
  display:flex;
  flex-flow:column;
`;
//}}}
//{{{ Button
export const Button = styled.div`
  display:inline-block;
  align-self:center;
  padding:10px 30px;
  position:relative;
  color:crimson;
  font:400 20px Roboto;
  margin:auto auto;
  border:1px solid crimson;
  border-radius:5px;
  cursor:pointer;
  &:hover {
    background-color:crimson;
    color:white;
  }
  `;
  //}}}
