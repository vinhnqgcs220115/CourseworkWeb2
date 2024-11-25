<template>
  <div>
      <h1>Test</h1>

      <div v-if="words.length < 5">
          <p>You need to enter at least five words to begin the test</p>
      </div>
      <div v-else>
          <div v-if="!testStarted">
              <h2>Are you ready to take the test?</h2>
              <button class="ui button primary" @click="startTest">Start</button>
          </div>
          <div v-else>
              <vocab-test 
                  :words="words"
                  :on-finish="handleTestFinish"
              ></vocab-test>
              <p>Time Remaining: {{ timeRemaining }} seconds</p>
          </div>
      </div>

      <!-- Message Box -->
      <div v-if="showResultBox" :class="['message-box', resultClass]">
          <div class="message-content">
              <h2>Congratulations! You have done the test</h2>
              <p>{{ result }}</p>
              <p>
                  Your test result has been saved to the 
                  <router-link to="/results">Test Results</router-link> page.<br>
                  You can see the details of your test: 
                  <router-link :to="detailLink">here</router-link>.
              </p>
              <button @click="closeMessageBox">Close</button>
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
          testStarted: false,
          timeRemaining: 300,
          timer: null,
          showResultBox: false,
          resultClass: "",
          result: "",
          detailLink: "", // Dynamic link to detailed results
      };
  },
  methods: {
      async startTest() {
          this.testStarted = true;
          this.startTimer();
      },
      startTimer() {
          this.timer = setInterval(() => {
              if (this.timeRemaining > 0) {
                  this.timeRemaining -= 1;
              } else {
                  clearInterval(this.timer);
                  this.handleTestFinish({ timeTaken: 300 });
              }
          }, 1000);
      },
      async handleTestFinish(testData) {
          clearInterval(this.timer);

          const finalData = {
              ...testData,
              timeTaken: 300 - this.timeRemaining,
          };

          const savedResult = await api.createTestResult(finalData);

          // Determine the message based on the score
          if (finalData.score <= 5) {
              this.result = "Each test is an opportunity to improve. Take your time to prepare better next time.";
              this.resultClass = "error";
          } else if (finalData.score <= 10) {
              this.result = "Good effort! With more practice, you'll see even better results.";
              this.resultClass = "warning";
          } else {
              this.result = "Excellent work! Keep up the great progress.";
              this.resultClass = "success";
          }

          // Set the detailed result link
          this.detailLink = `/results/${savedResult._id}`;

          // Show the message box
          this.showResultBox = true;
      },
      closeMessageBox() {
          this.showResultBox = false;
          location.reload();
      },
  },
  async mounted() {
      this.words = await api.getWords();
  },
  beforeDestroy() {
      if (this.timer) {
          clearInterval(this.timer);
      }
  },
};
</script>

<style scoped>
.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  max-width: 400px;
}
.message-box.success {
  border: 2px solid #4caf50;
}
.message-box.warning {
  border: 2px solid #ff9800;
}
.message-box.error {
  border: 2px solid #f44336;
}
.message-content h2 {
  margin-bottom: 15px;
}
.message-content button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.message-content button:hover {
  background-color: #0056b3;
}
</style>
