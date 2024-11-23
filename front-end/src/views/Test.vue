<template>
    <div>
      <h1>Test</h1>
  
      <div v-if="words.length < 5">
        <p>You need to enter at least five words to begin the test</p>
      </div>
      <div v-else>
        <vocab-test :words="words"></vocab-test>

        <div>
          <p>Time remaining: {{ timeRemaining }} seconds</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  import VocabTest from '../components/vocabTest.vue';
  
  export default {
    name: 'test',
    components: {
      'vocab-test': VocabTest
    },
    data() {
      return {
        words: [],
        timeRemaining: 10,
        timer: null,
      };
    },
    methods: {
      startTimer: function() {
        this.timer = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining -=1
          } else {
            clearInterval(this.timer);
            this.finishTest();
          }
        }, 1000);
      },
      finishTest: function() {
        alert('Time is up! Your test is complete.');

        const incorrectGuesses = this.incorrectGuesses || [];
        const remainingQuestion = this.questionPool || [];

        // save result
        const testResult = {
          date: new Date().toLocaleString(),
          score: this.score,
          totalQuestions: this.totalQuestions,
          questions: incorrectGuesses.concat(remainingQuestion.map(q => ({
            word: q.word,
            language: q.language,
            userAnswer: '',
            correctAnswer: q.word[q.language],
            correct: false
          }))),
        };

        const existingResults = JSON.parse(localStorage.getItem('testResults')) || [];

        existingResults.unshift(testResult);
        if (existingResults > 5) {
          existingResults.pop();
        }

        localStorage.setItem('testResults', JSON.stringify(existingResults));

        this.$router.push('/results')
      }
    },
    async mounted() {
      this.words = await api.getWords();

      if (this.words.length >= 5) {
        this.startTimer();
      }
    },
    beforeDestroy: function() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
  </script>
