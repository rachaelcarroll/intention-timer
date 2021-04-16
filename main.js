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
  var currentActivity = null;
  var savedActivities = [];

  // EVENT LISTENERS //
  categoryContainer.addEventListener('click', changeColor)
  startActivityBtn.addEventListener('click', startActivity)

  // EVENT HANDLERS AND GLOBAL FUNCTIONS//
  function changeColor() {
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
      category = event.target.id
  }

  function addColor(button, activeClass) {
    button.classList.add(activeClass)
  }

  function removeColor(button, activeClass) {
    button.classList.remove(activeClass)
  }

  function startActivity() {
    event.preventDefault()
    var category = checkCategory();
    checkInputs(category);
    if(category !== '' && goalInput.value !== '' && minutesInput.value !== '' && secondsInput.value !== '') {
      currentActivity = new Activity(category, goalInput.value, minutesInput.value, secondsInput.value)
    }
    savedActivities.push(currentActivity);
    console.log(currentActivity)
    console.log(savedActivities)
  }

  function checkInputs(category) {
    if (goalInput.value === "") {
      descriptionError.classList.remove('hidden')
    }
    if (minutesInput.value === "" && secondsInput.value === "") {
      timeError.classList.remove('hidden')
    }
    if (category === 'no category selected') {
      categoryError.classList.remove('hidden')
    }
  }

  function checkCategory() {
    event.preventDefault();
    if (studyBtn.classList.contains('study-button-active')) {
      return 'Study'
    } else if (meditateBtn.classList.contains('meditate-button-active')) {
      return 'Meditate'
    } else if (exerciseBtn.classList.contains("exercise-button-active")) {
      return 'Exercise'
    } else {
      return 'no category selected'
    }
  }
