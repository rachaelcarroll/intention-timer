  // Variables for HTML elements //
  var categoryContainer = document.getElementById('buttonContainer')
  var studyBtn = document.getElementById('studyButton')
  var meditateBtn = document.getElementById('meditateButton')
  var exerciseBtn = document.getElementById('exerciseButton')
  var goalInput = document.getElementById('goals');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');
  var categoryError = document.getElementById('categoryError')
  var descriptionError = document.getElementById('descriptionError')
  var timeError = document.getElementById('timeError')
  var startActivityBtn = document.getElementById('startActivity')
  // EVENT LISTENERS //
  categoryContainer.addEventListener('click', changeColor)
  startActivityBtn.addEventListener('click', startActivity)

  // EVENT HANDLERS AND GLOBAL FUNCTIONS//
  function changeColor(event) {
    event.preventDefault()
    if (event.target.id === 'studyButton') {
      addColor(studyBtn, 'study-button-active')
      removeColor(exerciseBtn, 'exercise-button-active')
      removeColor(meditateBtn, 'meditate-button-active')
    } else if (event.target.id === 'meditateButton') {
      addColor(meditateBtn, 'meditate-button-active')
      removeColor(exerciseBtn, 'exercise-button-active')
      removeColor(studyBtn, 'study-button-active')
    } else if (event.target.id === 'exerciseButton') {
      addColor(exerciseBtn, 'exercise-button-active')
      removeColor(meditateBtn, 'meditate-button-active')
      removeColor(studyBtn, 'study-button-active')
    }
  }

  function addColor(button, activeClass) {
    button.classList.add(activeClass)
  }

  function removeColor(button, activeClass) {
    button.classList.remove(activeClass)
  }


  function startActivity() {
    event.preventDefault()
    checkInputs()
  }

  function checkInputs() {
    if (goalInput.value === "") {
      descriptionError.classList.remove('hidden')
      console.log(goalInput.value)
    }



    console.log(minutesInput.value);
    console.log(secondsInput.value)
  }