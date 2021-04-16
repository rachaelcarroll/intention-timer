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
  var category = null;
  var currentActivity = null;
  // var savedActivities = []
  // EVENT LISTENERS //
  categoryContainer.addEventListener('click', changeColor)
  startActivityBtn.addEventListener('click', startActivity)

  // EVENT HANDLERS AND GLOBAL FUNCTIONS//
  function changeColor(event) {
    event.preventDefault();
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
      category = event.target
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
    currentActivity = new Activity(category.value, goalInput.value, minutesInput.value, secondsInput.value)
    console.log(currentActivity)
  }

  function checkInputs() {
    if (goalInput.value === "") {
      descriptionError.classList.remove('hidden')
    }
    if (minutesInput.value === "" && secondsInput.value === "") {
      timeError.classList.remove('hidden')
    }
    if (category === '') {
      categoryError.classList.remove('hidden')
    }
  }
