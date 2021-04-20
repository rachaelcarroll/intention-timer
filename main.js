  // Variables for HTML elements //
  var categoryContainer = document.getElementById('buttonContainer')
  var studyBtn = document.getElementById('studyButton')
  var meditateBtn = document.getElementById('meditateButton')
  var exerciseBtn = document.getElementById('exerciseButton')
  var goalInput = document.getElementById('goals');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');
  var categoryError = document.getElementById('categoryError');
  var descriptionError = document.getElementById('descriptionError');
  var timeError = document.getElementById('timeError');
  var startActivityBtn = document.getElementById('startActivity');
  var newActivityForm = document.getElementById('newActivityForm');
  var currentActivityForm = document.getElementById('currentActivityForm');
  var countdown = document.getElementById('countdown');
  var countdownMin = document.getElementById('minutesCountdown');
  var countdownSec = document.getElementById('secondsCountdown');
  var formHeader = document.getElementById('leftHeader');
  var displayGoal = document.getElementById('displayGoal');
  var startTimerBtn = document.getElementById('startTimer');
  var logActivityBtn = document.getElementById('logActivity');
  var createNewActivityBtn = document.getElementById('createNewActivity');
  var rightMessage = document.getElementById('rightMessage');
  var pastActivitySection = document.getElementById('activityCardContainer')
  var currentActivity;
  var savedActivities = [];

  // EVENT LISTENERS //
  window.addEventListener('load', retrieveFromStorage)
  categoryContainer.addEventListener('click', changeColor)
  startActivityBtn.addEventListener('click', startActivity)
  startTimerBtn.addEventListener('click', startCountdown)
  logActivityBtn.addEventListener('click', logActivity)
  createNewActivityBtn.addEventListener('click', createNewActivity)

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
    event.preventDefault();
    var category = checkCategory();
    checkInputs(category);
    if (category !== '' && goalInput.value !== '' && minutesInput.value !== '' && secondsInput.value !== '') {
      currentActivity = new Activity(category, goalInput.value, minutesInput.value, secondsInput.value)
      changeActivityView();
      changeTimerColor();
      console.log(currentActivity)
    }
  }

  function changeActivityView() {
    newActivityForm.classList.add('hidden')
    currentActivityForm.classList.remove('hidden')
    formHeader.innerText = "Current Activity";
    displayGoal.innerText = currentActivity.description;
    if (currentActivity.minutes < 10 || currentActivity.seconds < 10) {
      countdownMin.innerText = `0${currentActivity.minutes}`;
      countdownSec.innerText = `0${currentActivity.seconds}`;
    }
  }

  function changeTimerColor() {
    if (currentActivity.category === "Study") {
      startTimer.classList.add("start-study-button")
    } else if (currentActivity.category === "Meditate") {
      startTimer.classList.add("start-meditate-button")
    } else if (currentActivity.category === "Exercise") {
      startTimer.classList.add("start-exercise-button")
    }
  };

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

  function startCountdown() {
    var duration = (parseInt(currentActivity.minutes) * 60) + parseInt(currentActivity.seconds);
    var display = countdown;
    currentActivity.countdown(duration, display);
    currentActivity.markComplete();
    savedActivities.push(currentActivity);
    console.log('data model', savedActivities)
  }

  function logActivity() {
    event.preventDefault();
    hide(createNewActivityBtn, true)
    hide(logActivityBtn, false)
    hide(displayGoal, false)
    hide(countdown, false)
    hide(startTimerBtn, false)
    hide(rightMessage, false)
    formHeader.innerText = "Completed Activity";
    createPastActivityCard();
    currentActivity.saveToStorage()
  }

  function hide(element, hidden) {
    if (hidden) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }

  function createCardColor() {
    for (var i = 0; i < savedActivities.length; i++) {
      if (savedActivities[i].category === 'Study') {
        return 'completed-study'
      } else if (savedActivities[i].category === 'Meditate') {
        return 'completed-meditate'
      } else if (savedActivities[i].category === 'Exercise') {
        return 'completed-exercise'
      }
    }
  }

  function createPastActivityCard() {
    pastActivitySection.innerHTML = '';
    var cardStyle = createCardColor();
    for (var i = 0; i < savedActivities.length; i++) {
      pastActivitySection.innerHTML +=
        `<section class="activity-card" id="activityCard">
           <div class="activity-style ${cardStyle}" id="completedActivity">
             <h5 class="category" id="category">${savedActivities[i].category}</h5>
             <p class="time-logged" id="timeLogged"><span class="minute-num" id="minuteNum">${savedActivities[i].minutes}</span> MIN <span class="seconds-num" id="secondsNum">${savedActivities[i].seconds}</span> SECONDS </p>
           </div>
           <p class="past-goal" id="pastGoal">${savedActivities[i].description}</p>
           </section>
        `
    }
  }

  function retrieveFromStorage() {
    pastActivitySection.innerHTML = '';
    if (localStorage.length < 1) {
      hide(rightMessage, true)
    }
    var storedActivities = JSON.parse(localStorage.getItem('savedCards'));
    if (storedActivities !== null) {
      for (var i = 0; i < storedActivities.length; i++) {
        var storedActivity = new Activity(storedActivities[i].category, storedActivities[i].description, storedActivities[i].minutes, storedActivities[i].seconds);
        savedActivities.push(storedActivity);
        hide(rightMessage, false)
        createPastActivityCard();
      }
    }
  }

  function createNewActivity() {
    window.addEventListener('load', retrieveFromStorage);
    hide(rightMessage, false)
    formHeader.innerText = "New Activity";
  }
