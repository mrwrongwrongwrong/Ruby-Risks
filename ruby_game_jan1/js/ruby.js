const app = new Vue({
  el: '#app',
  data: {
    message: 'hello',
    players: [],
    player_rubies: [0, 0, 0, 0, 0],
    playerIfGiveUp: [],
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
    round: 0,
    inputPlayers: ''
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
      // if (this.boxNumber == 0 || this.boxNumber % this.playerNum != 0) {
      //   alert('The number of boxes must be divisible by the number of players and the remainder must be 0.')
      //   ok = false
      // }
      if (this.playerNum < 2) {
        alert('The number of the player must be between 2 and 5.')
        ok = false
      }
      if (ok) {
        //Making the box as two times of the number of players, the total rubies as ten times of the players
        this.boxNumber = this.playerNum * 2
        this.rubyNumber = this.playerNum * 10
        this.ifStart = !this.ifStart
        this.currentPlayer = this.players[0]
        //this.gameResult += 'OK, the number of rubies in the box will be revealed as soon as you submit your guess.\n'
        this.gameResult += 'When you request a certain of rubies, if there are at least that many, you will get them. If there are fewer, you will get none. The game ends when every box is empty.\n'
        for (let i = 0; i < this.playerNum; i++) {
          this.playerIfGiveUp.push(false)
        }
        //randomize the rubies in each box
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
    addPlayer() {
      this.$refs.close1.click()
      if (!this.inputPlayers) {
        return
      }
      this.players = this.inputPlayers.split(',')
      //When there is only one player, automatically add an AI
      if (this.playerNum == 1) {
        this.addAI()
      }
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
    openBox(index) {
      this.ideaBoxIndex = index + 1
      this.guessNumber = ''
    },
    submit() {
      this.$refs.close2.click()
      //When game is not finished, the total turns is equal to the total amount of boxes
      if (this.round < this.boxNumber) {
        if (this.ideaBoxIndex > this.boxNumber * 1) {
          alert('The box index must be lower than ' + this.boxNumber + '.')
          return
        }
        if (this.boxIfOpened[this.ideaBoxIndex - 1]) {
          //alert('The box has been opened: ' + this.ideaBoxIndex + '.')
          return
        }
        this.openedBoxNumber += 1
        this.boxIfOpened[this.ideaBoxIndex - 1] = true
        // alert('The box ' + this.ideaBoxIndex + ' is opened.')
        //calculating if the current player earns the rubies
        let currentIndex = this.round % this.playerNum
        this.currentPlayer = this.players[currentIndex]
        let currentBoxRuby = this.rubiesEachBox[this.ideaBoxIndex - 1]
        if (this.guessNumber <= currentBoxRuby) {
          this.player_rubies[currentIndex] += this.guessNumber * 1
          //this.gameResult += 'Congratulations, ' + this.currentPlayer + ' get ' + this.guessNumber + ' rubies. The opened box index is ' + this.ideaBoxIndex + '.\n'
          this.gameResult += 'Congratulations, ' + this.currentPlayer + ' has received ' + this.guessNumber + ' rubies from box ' + this.ideaBoxIndex + '.\n'
          alert('Congratulations to ' + this.currentPlayer + ' !')
          //determine if one of the players has more than half amount of total rubies
          if (this.player_rubies[currentIndex] > this.rubyNumber / 2) {
            this.checkResult()
          }
        }
        else {
          this.gameResult += 'Sorry. ' + this.currentPlayer + ' has received 0 rubies from box ' + this.ideaBoxIndex + '.\n'
          //alert('That is more than the number of rubies in the box.')
        }
        this.round += 1
        //whether game is finished
        if (this.round == this.boxNumber) {
          this.checkResult()
          return
        }
        //calculating the next player
        currentIndex = this.computeNextPlayer()
        //If the current player is AI, then execute for one round
        if (this.currentPlayer == 'AIPlayer') {
          let aiGuessNumber = Math.floor(Math.random() * (this.rubyNumber / this.boxNumber)) + 1
          let aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
          while (this.boxIfOpened[aiIdeaBoxNumber - 1]) {
            aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
          }
          this.openedBoxNumber += 1
          this.boxIfOpened[aiIdeaBoxNumber - 1] = true
          //calculating if the current player earns the rubies
          currentBoxRuby = this.rubiesEachBox[aiIdeaBoxNumber - 1]
          if (aiGuessNumber <= currentBoxRuby) {
            this.player_rubies[currentIndex] += aiGuessNumber
            this.gameResult += 'Congratulations, AI Player has received ' + aiGuessNumber + ' rubies from box ' + aiIdeaBoxNumber + '.\n'
            //whether the current player has more than half of the rubies
            if (this.player_rubies[currentIndex] > this.rubyNumber / 2) {
              this.checkResult()
            }
          }
          else {
            this.gameResult += 'Sorry. AI Player has received 0 rubies from box ' + aiIdeaBoxNumber + '.\n'
          }
          this.round += 1
          //whether game should stop
          if (this.round < this.boxNumber) {
            //calculating for the next player
            this.computeNextPlayer()
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
    //give up the game, returning his/her rubies back to all the unopened boxes
    giveUp() {
      alert('Player ' + this.currentPlayer + ' give up the game, his rubies are distributed randomly to the remained boxes.')
      this.gameResult += 'Player ' + this.currentPlayer + ' give up the game, his rubies are distributed randomly to the remained boxes.\n'
      let currentIndex = this.players.indexOf(this.currentPlayer)
      let rubies = this.player_rubies[currentIndex]
      for (let i = 0; i < rubies; i++) {
        let randBox = Math.floor(Math.random() * this.boxNumber)
        while (this.boxIfOpened[randBox]) {
          randBox = Math.floor(Math.random() * this.boxNumber)
        }
        this.rubiesEachBox[randBox] += 1
      }
      this.playerIfGiveUp[currentIndex] = true
      this.player_rubies[currentIndex] = 0
      //calculating for the next player
      this.round += 1
      currentIndex = this.computeNextPlayer()
      //If AI, automatically execute for one round
      if (this.currentPlayer == 'AIPlayer') {
        let aiGuessNumber = Math.floor(Math.random() * (this.rubyNumber / this.boxNumber)) + 1
        let aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
        while (this.boxIfOpened[aiIdeaBoxNumber - 1]) {
          aiIdeaBoxNumber = Math.floor(Math.random() * this.boxNumber) + 1
        }
        this.openedBoxNumber += 1
        this.boxIfOpened[aiIdeaBoxNumber - 1] = true
        //calculating whether the player earns rubies
        let currentBoxRuby = this.rubiesEachBox[aiIdeaBoxNumber - 1]
        if (aiGuessNumber <= currentBoxRuby) {
          this.player_rubies[currentIndex] += aiGuessNumber
          this.gameResult += 'Congratulations, AI Player has received ' + aiGuessNumber + ' rubies from box ' + aiIdeaBoxNumber + '.\n'
          //whether the player has more than half of the rubies
          if (this.player_rubies[currentIndex] > this.rubyNumber / 2) {
            this.checkResult()
          }
        }
        else {
          this.gameResult += 'Sorry. AI Player has received 0 rubies from box ' + aiIdeaBoxNumber + '.\n'
        }
        this.round += 1
        //whether game is finished
        if (this.round < this.boxNumber) {
          //calculating for the next player
          this.computeNextPlayer()
        }
        else {
          this.checkResult()
        }
      }
    },
    //calculating for the next player
    computeNextPlayer() {
      let currentIndex = this.round % this.playerNum
      this.currentPlayer = this.players[currentIndex]
      //if this is the player who has gave up on the game, then round+1(skipping his round)
      while(this.playerIfGiveUp[currentIndex]) {
        this.round += 1
        //calculating for the next player
        currentIndex = this.round % this.playerNum
        this.currentPlayer = this.players[currentIndex]
      }
      //publishing which player's turn it is 
      this.gameResult += 'It is ' + this.currentPlayer +"'s turn" + '.\n'
      return currentIndex
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
      //if there are multiple winners
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