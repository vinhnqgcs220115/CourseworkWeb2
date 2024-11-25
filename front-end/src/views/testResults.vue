<template>
  <div>
      <h1>Test Results</h1>
      <div v-if="results.length === 0">
          <p>No test results available yet.</p>
      </div>

      <div v-else>
          <div v-for="(result, index) in results" :key="index" class="ui segment">
              <h2>Test #{{ result.index }}</h2>
              <p>Date: {{ result.date }}</p>
              <p>Time Taken: {{ result.timeTaken }} seconds</p>
              <p>You got {{ result.score }} correct question(s) out of {{ result.totalQuestions }}</p>
              <button @click="viewDetails(result)">View Details</button>
          </div>

          <!-- Load more results button -->
          <button v-if="!allLoaded" @click="loadMoreResults" class="ui button">Load More Results</button>
      </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: "results",
  data() {
      return {
          results: [],
          skip: 0,
          limit: 5,
          allLoaded: false,
      };
  },
  methods: {
      async fetchResults() {
        try {
        const response = await api.getTestResults(this.skip, this.limit);
        if (response.length === 0) {
            this.allLoaded = true;
        } else {
            this.results = [...this.results, ...response];
            this.skip += this.limit;
        }
    } catch (error) {
        console.error('Error fetching results:', error);
    }
      },
      loadMoreResults() {
          this.fetchResults();
      },
      viewDetails(result) {
          this.$router.push(`/results/${result._id}`);
      },
  },
  async mounted() {
      await this.fetchResults();
  },
};
</script>
