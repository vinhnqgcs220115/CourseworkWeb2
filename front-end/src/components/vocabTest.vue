<template>
  <div>
    <h2>Score: {{ score }} out of 15</h2>

    <form action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly :value="currWord.english" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i :class="currentFlag"></i> {{ currentLanguage }}
        </div>
        <input type="text" placeholder="Enter word..." v-model="answer" :disabled="testOver" autocomplete="off" />
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      questionPool: [],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      answer: '',
      score: 0,
      testOver: false,
      maxQuestions: 15,
      currentQuestion: null,
    };
  },
  computed: {
    totalQuestions() {
      return Math.min(this.maxQuestions, this.words.length);
    },
    currWord() {
      return this.currentQuestion ? this.currentQuestion.word : {};
    },
    currentLanguage() {
      return this.currentQuestion ? this.currentQuestion.language : '';
    },
    currentFlag() {
      return this.currentQuestion ? this.currentQuestion.flag : '';
    },
  },
  methods: {
    initializeTest() {
      // Prepare a pool of questions
      const languages = ['german', 'france', 'spain'];
      const flags = {
        german: 'germany flag',
        france: 'france flag',
        spain: 'spain flag',
      };
      const pool = [];
      this.words.forEach((word) => {
        languages.forEach((lang) => {
          pool.push({ word, language: lang, flag: flags[lang] });
        });
      });

      // Shuffle and pick a limited number of questions
      this.questionPool = pool.sort(() => 0.5 - Math.random()).slice(0, this.maxQuestions);
      this.loadNextQuestion();
    },
    loadNextQuestion() {
      if (this.questionPool.length) {
        this.currentQuestion = this.questionPool.shift();
      } else {
        this.testOver = true;
        this.displayResults();
      }
    },
    onSubmit() {
      if (this.answer.trim().toLowerCase() === this.currWord[this.currentLanguage].toLowerCase()) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push({
          english: this.currWord.english,
          language: this.currentLanguage,
          correctAnswer: this.currWord[this.currentLanguage],
        });
      }
      this.answer = '';
      this.loadNextQuestion();
    },
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrectList = this.incorrectGuesses
          .map(
            (guess) =>
              `<li>${guess.english} (${guess.language}): <strong>${guess.correctAnswer}</strong></li>`
          )
          .join('');
        this.result = `<strong>You got the following wrong:</strong><ul>${incorrectList}</ul>`;
        this.resultClass = 'error';
      }
    },
  },
  mounted() {
    this.initializeTest();
  },
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}
.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}
.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
