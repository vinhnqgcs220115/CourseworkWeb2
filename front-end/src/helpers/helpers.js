import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import 'vue-flash-message/dist/vue-flash-message.min.css'

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/words/';

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });

export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),
    deleteWord: handleError(async id => {
        const res = await axios.delete(`${baseURL}${id}`);
        return res.data;
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),
    updateWord: handleError(async payload => {
        const res = await axios.put(`${baseURL}${payload._id}`, payload);
        return res.data;
    }),
    getTestResults: async (skip = 0, limit = 5) => {
        const response = await axios.get(`http://localhost:3000/results?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    // Fetch a specific test result by ID
    getTestResult: async (id) => {
        const response = await axios.get(`http://localhost:3000/results/${id}`);
        return response.data;
    },

    // Create and save a test result
    createTestResult: async (result) => {
        const response = await axios.post(`http://localhost:3000/results`, result);
        return response.data;
    },
};
