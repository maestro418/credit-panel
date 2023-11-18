import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from './icons';
import { RestApi } from '../provider/restApi';
import { socket } from '../routes';
import { useI18n } from 'react-simple-i18n';



const DropDown = (props: any) => {

  const options = props.options;
  const { t } = useI18n();
  const [selectedOption, setSelectedOption] = useState(`${options[0].val}`);
  useEffect(() => {
    const formData = {
      option: selectedOption,
      username: props.select
    }
    if (selectedOption !== 'Process') {
      socket.emit('select', formData)
    }
    console.log(selectedOption)
  }, [selectedOption])
  return (
    <DropdownContainer>
      <DropdownToggle value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        {options.map((option: any) => (
          <DropdownMenuItem
            key={option}
            value={option.val}
          >
            <span>{option.text}</span>
          </DropdownMenuItem>
        ))}
        <Icon icon='CaretDown' />
      </DropdownToggle>
      {/* <DropdownMenu style={{ 'display': `${isOpen ? 'block' : 'none'}` }} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>

      </DropdownMenu> */}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`  
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.select`
  padding: 0.5em 1em;
  display:flex;
  gap:0.5em;
  border-radius:0.5em;
  align-items:center;
  cursor: pointer;
  border:none;
  background-color: #1c1f23;
  color: white;
  & i {
    margin-left: 0.5rem;
  }
`;

const DropdownMenuItem = styled.option`
  padding: 1em 2em;
  cursor: pointer;
  color:#1c1f23 ;
  width:transparent;
  background-color: white;
  &:hover {
    background-color:#a8dbff;
  }
`;

export default DropDown;
