const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        france: {
            type: String,
            required: 'France word cannot be blank'
        },
        spain: {
            type: String,
            required: 'Spain word cannot be blank'
        },
        album: {
            type: String,
            enum: ['greetings', 'numbers', 'animals', 'others'],
            required: 'Please choose collection for this word'
        }
    },
    { collection: 'vocab' }
);

const TestResultSchema = new Schema(
    {
        index: {
            type: Number,
            required: true,
            unique: true
        },
        date: {
            type: String,
            required: true
        },
        timeTaken: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        totalQuestions: {
            type: Number,
            required: true
        },
        questions: [
            {
                word: { type: Object, required: true },
                language: { type: String, required: true },
                userAnswer: { type: String, required: false },
                correctAnswer: { type: String, required: true },
                correct: { type: Boolean, required: true },
            },
        ]
    },
    { collection: 'test results' }
)

module.exports = mongoose.model('Vocab', VocabSchema);
module.exports = mongoose.model('TestResult', TestResultSchema);
