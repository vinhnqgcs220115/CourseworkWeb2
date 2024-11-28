<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to='/words' exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to='/words/new' class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to='/test' class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to='/results' class="item">
            <i class="chart bar outline icon"></i> Test Results
          </router-link>
          <router-link to='/about' class="item">
            <i class="info circle icon"></i> About
          </router-link>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from './helpers/helpers';

export default {
  name: 'app',
  async created() {
    try {
      const words = await api.getWords();
      if (!words || words.length === 0) {
        this.$router.push('/about');
      }
    } catch (err) {
      console.error('Error check words: ', err);
      this.$router.push('/about')
    }
  }
}
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>
