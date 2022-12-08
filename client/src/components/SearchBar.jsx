import React from 'react'
import { useState } from 'react'
// import Select  from 'react-select'
import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import Calendar from 'react-calendar'
import Modal from 'react-bootstrap/Modal'
import  Button  from 'react-bootstrap/Button'

const StyledSearch = styled.div`
  height: 80px;
  background: #36B1F7;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  .search {
    margin: 0;
    margin-left: 30px;
    margin-right: 50px;
    width: 350px;
    height: 35px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 2px black;
    outline: none;
    border: none;
    display: flex;
  }
  .searchInput {
    margin-left: 5%;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    width: 83%;
  }
  .searchButton {
    background: none;
    border: none;
    outline: none;
  }
  .magIcon {
    font-size: 25px;
  }
  .magIcon:hover{
    cursor: pointer;
  }
  .selector{
    min-width: 100px;
    max-width: 400px;
    z-index: 1000;
  }
  .rangeButtons{
    position: relative;
    right:400px;
    margin: 10px;  
    
  }
  .dateModal{
    position: absolute;
  }
`


export default function SearchBar ({search, setSearch, filter, setFilter, searchNow}) {

  const [ showStartCal, setShowStartCal ] = useState(false)
  const [ showEndCal, setShowEndCal ] = useState(false)
  const [ readable, setReadable ] = useState({
    start: 'Start Date',
    end: 'End Date'
  })

  // const options = [
  //   {value: "hiking", label: "Hiking"},
  //   {value: "running", label: "Running"},
  //   {value: "rafting", label: "Ultimate Frisbee"},
  //   {value: "skiing", label: "Skiing"},
  //   {value: "mountainBiking", label: "Mountain Biking"},
  //   {value: "roadBiking", label: "Road Biking"},
  //   {value: "kayaking", label: "Kayaking"},
  //   {value: "rafting", label: "Whitewater Rafting"},
  //   {value: "fishing", label: "Fishing"},
  //   {value: "birdWatching", label: "Bird Watching"}
  // ]

  const handleSearch = (e) => {
    setSearch({...search, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch()
    searchNow()
  }

  // const handleSelect = (e) => {
  //   console.log(e)
  //   setFilter(() => {
  //     let updates = {}
  //     e.forEach(options => updates[options.value]=!filter[options.value])
  //     return {...filter, ...updates}
  //   })
  // }



  const handleShowStartCal = () => {setShowStartCal(!showStartCal)}
  const handleStartDate = (e) => {
    const readableStart = new Date(e).toISOString().split('T')[0].split('-')
    let year = readableStart.shift()
    readableStart.push(year)
    let readableDate = readableStart.join('/')
    setSearch({...search, start: new Date(e).toISOString().split('T')[0]})
    setReadable({...readable, start: readableDate})
  }

  const handleShowEndCal = () => {setShowEndCal(!showEndCal)}
  const handleEndDate = (e) => {
    const readableEnd = new Date(e).toISOString().split('T')[0].split('-')
    let year = readableEnd.shift()
    readableEnd.push(year)
    let readableDate = readableEnd.join('/')
    setSearch({...search, end: new Date(e).toISOString().split('T')[0]})
    setReadable({...readable, end: readableDate})
  }

  return (
    <StyledSearch>
      <form className='search' onSubmit={handleSubmit}>
        <input className='searchInput' type='text' onChange={handleSearch} name='name' placeholder='Event name'/>
        <button className='searchButton'><IoSearch className='magIcon'/></button>
      </form>
      {/* <Select className='selector' placeholder='Activity' options={options} isMulti closeMenuOnSelect={false} hideSelectedOptions={false} onChange={handleSelect}/> */}
      <Modal show={showStartCal} className='dateModal' onHide={handleShowStartCal}>
        <Modal.Header closeButton>Start Date</Modal.Header>
        <Modal.Body><Calendar onChange={handleStartDate} /></Modal.Body>
      </Modal>
      <Button onClick={handleShowStartCal} className='rangeButtons'>{readable.start}</Button>
      <Modal show={showEndCal} className='dateModal' onHide={handleShowEndCal}>
        <Modal.Header closeButton>Start Date</Modal.Header>
        <Modal.Body><Calendar onChange={handleEndDate} /></Modal.Body>
      </Modal>
      <Button onClick={handleShowEndCal} className='rangeButtons'>{readable.end}</Button>
      
    </StyledSearch>
  )
}