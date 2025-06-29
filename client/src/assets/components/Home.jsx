import React, { useState, useEffect } from 'react'
import '../../App.css'
import Navbar from './NavbarHome'
import Counter from './Counter'
import Emergency from './Emergency'
import Footer from './Footer'
import Tag from './Tag'
import Hero from './Hero'
import MapComponent from './MapComponent'
import axios from 'axios';


const Home = () => {

  const [stats, setStats] = useState({
    totalIssues: 0,
    solvedIssues: 0,
    totalSuggestions: 0,
    solvedSuggestions: 0,
    emergencyReported: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:3000/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex flex-col w-full gap-15 px-10 transition-color duration-500 ease-in-out'>
        <Hero />
        <MapComponent shadow='shadow-map' />

        <div className='flex flex-col m-auto gap-10 mb-10'>
          <Counter
            title='🛠️ Total Issues Overview'
            desc='This section provides a clear snapshot of the reported issues versus those that have been resolved. It helps monitor the current status of problem reports within the system, making it easy to identify progress and areas needing attention.'
            solved={stats.solvedIssues}
            issued={stats.totalIssues}
            shadow='shadow-issue'
            border='border-red-500'
            tags={
              <Tag tags={["Potholes", "Broken footpaths", "Overflowing garbage bins", "Lamppost not working", "Illegal parking", "Open manholes", "Water leakage", "Blocked drains", "Street dogs", "Noise pollution", "Damaged road signs", "Construction debris", "Encroachment on public space", "Waterlogging", "Improper sewage disposal"]} />}
          />

          <Counter
            title='💡 Total Suggestions Overview'
            desc='This section offers a transparent view of the ideas and improvements proposed by users. It helps track which suggestions have been reviewed or implemented, making it easy to understand community priorities and encourage continuous collaboration.'
            solved={stats.solvedSuggestions}
            issued={stats.totalSuggestions}
            shadow='shadow-suggestion'
            border='border-green-500'
            tags={
              <Tag tags={["Plant more trees", "Install CCTV cameras", "Add zebra crossings", "Build public toilets", "Increase dustbins", "Improve street lighting", "Create green zones", "Add speed breakers", "Set up water kiosks", "Promote waste segregation"]} />}
          />

          <Emergency
            reported={stats.emergencyReported}
            shadow='shadow-emergency'
            tags={<Tag tags={["Medical emergency", "Fire outbreak", "Criminal activity", "Accident reported", "Domestic violence", "Gas leak", "Electric short circuit", "Unconscious person", "Heart attack", "Police intervention", "Child in danger", "Flood rescue needed", "Missing person", "Natural disaster alert", "Armed robbery"]} />}
          />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
