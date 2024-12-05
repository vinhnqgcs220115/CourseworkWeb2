<template>
    <div class="about">
      <div class="intro-section">
        <img src="@/assets/profilePic.jpg" alt="Profile Picture" class="profile-image" />
        <div class="intro-text">
          <p>
            This project was undertaken as part of my Web 2 coursework, completed independently with guidance and support from my lecturer. <br><br> Personal information.
          </p>
          <p><strong>Name:</strong> Nguyen Quang Vinh</p>
          <p><strong>Email:</strong> <a :href="`mailto:${email}`">{{ email }}</a></p>
          <p><strong>GitHub:</strong> <a :href="githubLink" target="_blank">{{ githubLink }}</a></p>
        </div>
      </div>
  
      <div class="tutorial-section">
        <h2>How to Use the Navigation Bar</h2>
        <div class="tutorial-item">
          <p><strong>Navigaiton Bar:</strong> Use the navigation bar to explore various sections of the app.</p>
          <img src="@/assets/navbar.png" alt="NavBar Tutorial" />
        </div>
        <div class="tutorial-item">
          <p><strong>Words:</strong> View all the words currently in the database.</p>
          <img src="@/assets/words.png" alt="Words Tutorial" />
        </div>
        <div class="tutorial-item">
          <p><strong>New:</strong> Create a new word entry and add it to the database.</p>
          <img src="@/assets/new.png" alt="New Word Tutorial" />
        </div>
        <div class="tutorial-item">
          <p><strong>Test:</strong> Take a quiz based on all the words that have been added.</p>
          <img src="@/assets/test.png" alt="Test Tutorial" />
        </div>
        <div class="tutorial-item">
          <p><strong>Test while running:</strong></p>
          <img src="@/assets/testrunning.png" alt="Test Tutorial" />
        </div>
        <div class="tutorial-item">
          <p><strong>Test Results:</strong> View and analyze the results of quizzes.</p>
          <img src="@/assets/testresult.png" alt="Test Results Tutorial" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'about',
    data() {
      return {
        email: "vinhnqgcs220115@fpt.edu.vn",
        githubLink: "https://github.com/vinhnqgcs220115",
      };
    },
  };
  </script>
  
  <style scoped>
  .about-page {
    padding: 20px;
  }
  .intro-section {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .intro-text p {
    margin: 5px 0;
  }
  .tutorial-section {
    margin-top: 20px;
  }
  .tutorial-item {
    margin-bottom: 20px;
  }
  .tutorial-item img {
    max-width: 100%;
    margin-bottom: 10px;
  }
  </style>
  