class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  countdown(duration, display) {
    startTimerBtn.disabled = true;
    var timer = duration,
      minutes, seconds;
    var time = setInterval(function() {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        clearInterval(time);
        var partyEmoji = String.fromCodePoint(0x1F973)
        startTimerBtn.innerText = "COMPLETE!" + partyEmoji;
        logActivityBtn.classList.remove('hidden')
      }

    }, 1000);
  }

  markComplete() {
    this.completed = true
  }

  saveToStorage() {
    localStorage.setItem('savedCards', JSON.stringify(savedActivities))
  }


}