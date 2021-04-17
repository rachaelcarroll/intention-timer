class Activity {
  constructor(category, description, minutes, seconds, id){
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = null;
    this.id = Date.now();
  }


    //we need seconds to decrease by 1, and once it hits 0, minutes needs to decrease by 1
    //when timer is 00:00
    //window alert that
    countdown(duration, display) {
      startTimerBtn.disabled = true;
      var timer = duration, minutes, seconds;
      var time = setInterval(function () {
          minutes = parseInt(timer / 60);
          seconds = parseInt(timer % 60);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ":" + seconds;

          if (--timer < 0) {
            timer = 0;
            clearInterval(time);
          }

      }, 1000);
    }

  // markComplete(){
  // this.completed = true
  // startTimer.innerText = "COMPLETE!"
  // }

  saveToStorage(){

  }
}
