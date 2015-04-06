/*
  Here are all the connections to localStorage
*/

pull.component('localStorageAdapter', function () {
  return [
    syncLocalStorageTo
  , resetState
  , removeRunning
  , setRunning
  , isRunning
  , getCurrentRun
  , setCurrentRun
  , setSeconds
  , getSeconds
  , updateSeconds
  , setPeriodStartingTime
  , getPeriodStartingTime
  , resetPeriodStartingTime
  , getMinutes
  , getNthPeriod
  , setNthPeriod
  , incrementNthPeriod
  , getCurrentPeriodName
  , setCurrentPeriodName
  ]

  /* Executes a function in an interval and passes the current value of the desired localStorageItem to it */
  function syncLocalStorageTo (key, syncFunct, interval, dontDoFisrtTime) {
    var currentValue = localStorage.getItem(key)
    if(!dontDoFisrtTime) syncFunct(localStorage.getItem(key))
    setInterval(function () {
      if(localStorage.getItem(key) != currentValue){
        syncFunct(localStorage.getItem(key))
        currentValue = localStorage.getItem(key)
      }
    }, (interval || 500))
  }

  /* resets all used localStorage items */
  function resetState () {
    localStorage.setItem('currentPeriodSeconds', 0)
    localStorage.setItem('currentPeriod', 'run')
    localStorage.setItem('currentRun', 0)
    localStorage.setItem('nthPeriod', 0)
    localStorage.removeItem('running')
    resetPeriodStartingTime()
  }

  /* Removes running */
  function removeRunning () {
    localStorage.removeItem('running')
  }

  /* Sets running */
  function setRunning () {
    localStorage.setItem('running', true)
  }

  /* Sets running */
  function isRunning () {
    return !!localStorage.getItem('running')
  }

  /* Return the currentRun */
  function getCurrentRun () {
    return parseInt(localStorage.getItem('currentRun'))
  }

  /* sets the currentRun */
  function setCurrentRun (newValue) {
    localStorage.setItem('currentRun', newValue)
  }

  /* updates LocalStorage currentPeriodSeconds */
  function setSeconds (newValue) {
    localStorage.setItem('currentPeriodSeconds', newValue)
  }
  
  /* Recalculates seconds in localstorage */
  function updateSeconds () {
    setSeconds(getCurrentTimeSeconds() - getPeriodStartingTime())
  }

  /* Sets the periodStartingTime */
  function setPeriodStartingTime (newValue) {
    return localStorage.set('periodStartingTime', newValue)
  }

  /* Returns the PeriodStartingTime */
  function getPeriodStartingTime () {
    return localStorage.getItem('periodStartingTime')
  }

  /* Resets the periodStarting time to the current time */
  function resetPeriodStartingTime () {
    return localStorage.setItem('periodStartingTime', getCurrentTimeSeconds())
  }

  /* Returns the current time in Seconds */
  function getCurrentTimeSeconds () {
    return Math.round(new Date().getTime() / 1000)
  }

  /* gets LocalStorage currentPeriodSeconds */
  function getSeconds (newValue) {
    return parseInt(localStorage.getItem('currentPeriodSeconds'))
  }

  /* Calculates currentRunMinutes */
  function getMinutes () {
    return Math.floor(getSeconds() / 60)
  }

  /* gets nth period from localstorage */
  function getNthPeriod () {
    return parseInt(localStorage.getItem('nthPeriod'))
  }

  /* Sets the nthPeriod */
  function setNthPeriod (newValue) {
    localStorage.setItem('nthPeriod', newValue)
    return newValue
  }

  /* Increments the nthPeriod */
  function incrementNthPeriod () {
    return setNthPeriod(getNthPeriod() + 1)
  }

  /* Returns the current Period */
  function getCurrentPeriodName () {
    return localStorage.getItem('currentPeriod')
  }

  /* Sets the current period to passed value and returns it */
  function setCurrentPeriodName (newPeriod) {
    localStorage.setItem('currentPeriod', newPeriod)
    return newPeriod
  }
}, [])