
import styled from 'styled-components';

const CusArea = styled.textarea`
  width: 100%;
  outline: none;
  font-size: 15px;
  border: 1px solid #BDBDBD;
  transition: border 0s ease-out 0s;
  color: #525252;
  padding: 5px 7px;
  box-sizing: border-box;
  &:focus {
      border: 2px solid #20aee3;
      outline: 0 none;
      transition-duration: 0.3s;
      color: #525252;
    }
`;

export default CusArea;
