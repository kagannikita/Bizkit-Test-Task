import React, { useState } from 'react';
import styled from 'styled-components';
import downArrow from '../images/downArrow.svg';

const WrapperClose = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  flex-basis: 211px;
  min-width: 150px;
`;

const Select = styled.div`
  padding: 9px 0px 9px 13px;
  width: 100%;
  height: 36px;
  border: 1px solid #a8a8a8;
  background-color: #fff;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  color: #a8a8a8;
  ${props => (props.isOpen ? 'border-bottom-color: transparent;' : '')};
`;

const Arrow = styled.img`
  width: 9px;
  margin-left: auto;
  margin-right: 10px;
  opacity: 0.38;
`;

const Options = styled.div`
  position: absolute;
  ${props =>
    props.toTop ? 'bottom: calc(100% - 24px);' : 'top: calc(100% - 0px)'};
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 150px;
  overflow: auto;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border: 1px solid #c9ccd4;
  border-top: none;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 100;
  &::-webkit-scrollbar {
    width: 5px;
    background: #c9ccd4;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 14px;
    background: #6e7477;
    border-radius: 15px;
  }
`;

const Option = styled.span`
  display: inline-block;
  padding: 7px 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  color: #5d5c57;
  :hover {
    background: #ebebeb;
    color: #18191a;
  }
  :last-child {
    border-bottom: none;
  }
`;
export default props => {
  const [isOpenOptions, setIsOpen] = useState(false);

  const chooseOption = option => {
    props.handleChange(option.value);
    setIsOpen(false);
  };

  return (
    <>
      {isOpenOptions && props.options.length > 0 && (
        <WrapperClose onClick={() => setIsOpen(false)} />
      )}
      <Wrapper style={props.styles}>
        <Select
          onClick={() => setIsOpen(!isOpenOptions)}
          isOpen={isOpenOptions}
          error={props.error}
        >
          {props.initialOption === '' ? props.placeholder : props.initialOption}
          <Arrow src={downArrow}></Arrow>
        </Select>
        {isOpenOptions && props.options.length > 0 && (
          <Options toTop={props.toTop}>
            {props.options.map((option, index) => (
              <Option
                key={`${option}-${index}`}
                onClick={() => chooseOption(option)}
              >
                {option.name}
              </Option>
            ))}
          </Options>
        )}
      </Wrapper>
    </>
  );
};
