<template>
    <div>
        <h1>Test Result Details</h1>
        <p><strong>Date:</strong> {{ result.date }}</p>
        <p><strong>Score:</strong> {{ result.score }} / {{ result.totalQuestions }}</p>
        <p><strong>Time Taken:</strong> {{ result.timeTaken }} seconds</p>

        <ul>
            <li v-for="(question, index) in result.questions" :key="index">
                <p>Question {{ index + 1 }}: {{ question.word.english }}</p>
                <p>Target Language: {{ question.language }}</p>
                <p>
                    Your Answer: {{ question.userAnswer }}
                    <span v-if="question.correct">✅</span>
                    <span v-else>❌</span>
                </p>
                <p>Correct Answer: <strong>{{ question.correctAnswer }}</strong></p>
                <br>
            </li>
        </ul>
    </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
    name: "details",
    data() {
        return {
            result: {},
        };
    },
    async mounted() {
        const id = this.$route.params.id;
        this.result = await api.getTestResult(id);
    },
};
</script>
