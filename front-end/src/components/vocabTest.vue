<template>
    <div>
        <form @submit.prevent="submitTest">
            <div v-for="(question, index) in questionPool" :key="index" class="ui segment">
                <h3>Question {{ index + 1 }}</h3>
                <div class="ui labeled input fluid">
                    <div class="ui label">
                        <i class="united kingdom flag"></i> English
                    </div>
                    <input type="text" readonly :value="question.word.english" />
                </div>
                <div class="ui labeled input fluid">
                    <div class="ui label">
                        <i :class="question.flag"></i> {{ question.language }}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter word..."
                        v-model="question.userAnswer"
                        autocomplete="off"
                    />
                </div>
            </div>
            <button type="submit" class="ui button positive">Submit Test</button>
        </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "vocab-test",
    props: {
        words: {
            type: Array,
            required: true,
        },
        onFinish: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            questionPool: [],
        };
    },
    methods: {
        initializeTest() {
            const languages = [
                { key: "german", label: "German", flag: "germany flag" },
                { key: "france", label: "French", flag: "france flag" },
                { key: "spain", label: "Spanish", flag: "spain flag" },
            ];
  
            // Create a pool of unique questions with each English word appearing in multiple languages but no duplicates
            const pool = [];
            this.words.forEach((word) => {
                const usedLanguages = new Set();
                while (usedLanguages.size < languages.length) {
                    const randomLang = languages[Math.floor(Math.random() * languages.length)];
                    if (!usedLanguages.has(randomLang.key)) {
                        pool.push({
                            word,
                            language: randomLang.label,
                            flag: randomLang.flag,
                            correctAnswer: word[randomLang.key],
                            userAnswer: "",
                        });
                        usedLanguages.add(randomLang.key);
                    }
                }
            });
  
            // Shuffle the questions and pick the first 15
            this.questionPool = pool.sort(() => Math.random() - 0.5).slice(0, 15);
        },
        submitTest() {
            const score = this.questionPool.reduce(
                (total, question) =>
                    total +
                    (question.userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase() ? 1 : 0), 0
            );
  
            this.onFinish({
                score,
                totalQuestions: this.questionPool.length,
                questions: this.questionPool.map((q, index) => ({
                    questionNumber: index + 1,
                    word: q.word,
                    language: q.language,
                    userAnswer: q.userAnswer || "",
                    correctAnswer: q.correctAnswer,
                    correct: q.userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase(),
                })),
            });
        },
    },
    mounted() {
        this.initializeTest();
    },
  };
  </script>
  