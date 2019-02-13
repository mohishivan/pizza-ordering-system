import React from "react"
import styled from "styled-components"


//{{{ Container
export const Container = styled.div`
  height:100vh;
  width:100wh;
  display:flex;
  flex-flow:row nowrap;
`;
//}}}
//{{{ Builder
export const Builder = styled.div`
  flex-basis:60%;
  display:flex;
  flex-flow:column;
`;
//}}}
//{{{ Cart
export const Cart = styled.div`
  flex-basis:60%;
  display:flex;
  flex-flow:column;
`;
//}}}
