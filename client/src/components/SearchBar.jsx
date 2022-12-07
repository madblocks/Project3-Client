import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../DataContext'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import Dropdown from 'react-bootstrap/Dropdown'

const StyledSearch = styled.div`

`

export default function SearchBar (props) {
  return (
    <StyledSearch>
      SearchBar
    </StyledSearch>
  )
}