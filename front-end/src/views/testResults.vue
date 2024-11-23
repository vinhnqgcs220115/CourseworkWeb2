<template>
    <div>
      <h1>Test Results</h1>
      <div v-if="results.length === 0">
        <p>No test results available yet.</p>
      </div>
      <div v-else>
        <div v-for="(result, index) in results" :key="index" class="ui segment">
          <h2>Test #{{ index + 1 }} - {{ result.date }}</h2>
          <p>Score: {{ result.score }} out of {{ result.totalQuestions }}</p>
          <ul>
            <li v-for="(question, idx) in result.questions" :key="idx">
              <span>
                {{ question.word.english }} ({{ question.language }}): 
                <strong>{{ question.userAnswer }}</strong> 
                <span v-if="question.correct">✅</span>
                <span v-else>
                  ❌ (Correct: {{ question.correctAnswer }})
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestResults',
    data() {
      return {
        results: [], // Holds the saved test results
      };
    },
    methods: {
      fetchResults() {
        // local stored
        const storedResults = localStorage.getItem('testResults');
        this.results = storedResults ? JSON.parse(storedResults) : [];
      },
    },
    mounted() {
      this.fetchResults();
    },
  };
  </script>
  
  <style scoped>
  h2 {
    margin-top: 0;
  }
  li {
    margin-bottom: 8px;
  }
  </style>
  