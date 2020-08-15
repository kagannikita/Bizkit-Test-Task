import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 80px;
  margin-top: ${props => props.top};
`;

const Input = styled.textarea`
  padding: 13px 17px;
  width: 100%;
  height: 100%;
  border: 1px solid #a8a8a8;
  background-color: #fff;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  outline: none;
  color: #a8a8a8;
  resize: none;
  :focus {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    color: #18191a;
  }
  :placeholder {
    color: #a8a8a8;
  }
`;

const InputWrap = styled.div`
  position: relative;
  height: 100%;
`;

export default props => {
  return (
    <Wrapper
      width={props.width}
      top={props.top}
      style={props.styles}
      onClick={props.onClick ? props.onClick : null}
    >
      <InputWrap>
        <Input
          type={props.type ? props.type : 'text'}
          onChange={e => props.handleChange(e.target.value)}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          disabled={props.disabled}
          color={props.color}
          euro={props.euro}
          errorData={props.errorData}
        />
      </InputWrap>
    </Wrapper>
  );
};
