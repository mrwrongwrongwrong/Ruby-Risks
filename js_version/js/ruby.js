const app = new Vue({
  el: '#app',
  data: {
    message: 'hello',
    players: [],
    player_rubies: [0, 0, 0, 0, 0],
    currentPlayer: 'Nobody',
    openedBoxNumber: 0,
    guessNumber: null,
    ideaBoxIndex: null,
    rubyNumber: 0,
    boxNumber: 0,
    rubiesEachBox: [],
    boxIfOpened: [],
    gameResult: '',
    ifStart: false,
    hasAI: false,
    round: 0
  },
  computed: {
    playerNum() {
      return this.players.length
    }
  },
  methods: {
    startGame() {
      let ok = true
      for (let i = 0; i < this.playerNum; i++) {
        for (let j = i + 1; j < this.playerNum; j++) {
          if (this.players[i] == this.players[j]) {
            alert(this.players[i] + ' is in the player list, please give a different name.')
            ok = false
          }
        }
      }
      if (this.boxNumber == 0 || this.boxNumber % this.playerNum != 0) {
        alert('The number of boxes must be divisible by the number of players and the remainder must be 0.')
        ok = false
      }
      if (this.playerNum < 2) {
        alert('The number of the player must be between 2 and 5.')
        ok = false
      }
      if (ok) {
        this.ifStart = !this.ifStart
        this.currentPlayer = this.players[0]
        this.gameResult += 'OK, the number of rubies in the box will be revealed as soon as you submit your guess.\n'
        //randomize the number of rubies in each box
        this.rubiesEachBox = []
        this.boxIfOpened = []
        for (let i = 0; i < this.boxNumber; i++) {
          this.rubiesEachBox.push(0)
          this.boxIfOpened.push(false)
        }
        for (let i = 0; i < this.rubyNumber; i++) {
          let randBox = Math.floor(Math.random() * this.boxNumber)
          this.rubiesEachBox[randBox] += 1
        }
        console.log('The rubies in each box: ', this.rubiesEachBox);
      }
    },
    stopGame() {
      this.ifStart = !this.ifStart
    },
    addAI() {
      if (this.ifStart)
        return
      if (this.playerNum == 5) {
        alert('The number of players is 5, cannot add AI player.')
      } else {
        if (this.hasAI) {
          this.players.splice(this.players.indexOf('AIPlayer'), 1)
          this.gameResult += 'Delete AI Player Success.\n'
        } else {
          this.players.push('AIPlayer')
          this.gameResult += 'Add AI Player Success.\n'
        }
        this.hasAI = !this.hasAI
      }
    },
    submit() {
      //the turn of the game is equal to the number of boxes
      if (this.round < this.boxNumber) {
        if (this.ideaBoxIndex > this.boxNumber * 1) {
          alert('The box index must be lower than ' + this.boxNumber + '.')
          return
        }
        if (this.boxIfOpened[this.ideaBoxIndex - 1]) {
          alert('The box has been opened: ' + this.ideaBoxIndex + '.')
          return
        }
        this.openedBoxNumber += 1
        this.boxIfOpened[this.ideaBoxIndex - 1] = true
        alert('The box ' + this.ideaBoxIndex + ' is opened.')
        //calculating if the current player gets the rubies
        let currentIndex = this.round % this.playerNum
        this.currentPlayer = this.players[currentIndex]
        let currentBoxRuby = this.rubiesEachBox[this.ideaBoxIndex - 1]
        if (this.guessNumber <= currentBoxRuby) {
          this.player_rubies[currentIndex] += this.guessNumber * 1
          this.gameResult += 'Congratulations, ' + this.currentPlayer + ' get ' + this.guessNumber + ' rubies. The opened box index is ' + this.ideaBoxIndex + '.\n'
        }
        else {
          this.gameResult += 'Sorry, ' + this.currentPlayer + ' gets 0 rubies.\n'
        }
        this.round += 1
        //whether the game is finished or not
        if(this.round == this.boxNumber) {
          this.checkResult()
          return
        }
        //calculating next player
        currentIndex = this.round % this.playerNum
        this.currentPlayer = this.players[currentIndex]
        //if AI player, then automatically plays one turn
        if (this.currentPlayer == 'AIPlayer') {
          let aiGuessNumber = Math.floor(Math.random() * (this.rubyNumber / this.boxNumber)) + 1
          let aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
          while (this.boxIfOpened[aiIdeaBoxNumber - 1]) {
            aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
          }
          this.openedBoxNumber += 1
          this.boxIfOpened[aiIdeaBoxNumber - 1] = true
          //calculating whether the player gets the rubies
          currentBoxRuby = this.rubiesEachBox[aiIdeaBoxNumber - 1]
          if (aiGuessNumber <= currentBoxRuby) {
            this.player_rubies[currentIndex] += aiGuessNumber
            this.gameResult += 'Congratulations, AIPlayer get ' + aiGuessNumber + ' rubies. The opened box index is ' + aiIdeaBoxNumber + '.\n'
          }
          else {
            this.gameResult += 'Me regret, AIPlayer get 0 rubies.\n'
          }
          this.round += 1
          //whether game is finished
          if(this.round < this.boxNumber) {
            //next turn, next player
            currentIndex = this.round % this.playerNum
            this.currentPlayer = this.players[currentIndex]
          }
          else {
            this.checkResult()
          }
        }
      }
      //game is finished
      else {
        this.checkResult()
      }
    },
    checkResult() {
      let winner = ''
      let maxRuby = -1
      for (let i in this.player_rubies) {
        if (this.player_rubies[i] > maxRuby) {
          winner = this.players[i]
          maxRuby = this.player_rubies[i]
        }
      }
      //detecting if there is an extra winner
      let winnerList = []
      for (let i in this.player_rubies) {
        if (this.player_rubies[i] == maxRuby) {
          winnerList.push(this.players[i])
        }
      }
      this.currentPlayer = 'Nobody'
      this.gameResult += 'Game Over. The Winner is/are ' + winnerList.join(' ') + ' and his/her ruby number is ' + maxRuby + '.\n'
      alert('Game Over. The Winner is/are ' + winnerList.join(' ') + ' and his/her ruby number is ' + maxRuby + '.')
    }
  }
})