<template>
    <div>
        <h1>Words</h1>
        
        <div class="ui form">
            <div class="field">
                <label>Filter by Collection</label>
                <select v-model="selectedCollection" class="ui dropdown">
                    <option value="">All</option>
                    <option value="greetings">Greetings</option>
                    <option value="numbers">Numbers</option>
                    <option value="animals">Animals</option>
                    <option value="others">Others</option>
                </select>
            </div>
        </div>

        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th><span><i class="united kingdom flag"></i>English</span></th>
                    <th><span><i class="germany flag"></i>German</span></th>
                    <th><span><i class="france flag"></i>Franch</span></th>
                    <th><span><i class="spain flag"></i>Spain</span></th>
                    <!-- <th><span><i class="tags icon"></i>Collection</span></th> -->
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tr v-for="(word, i) in filteredWord" :key="i">
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td>{{ word.france }}</td>
                <td>{{ word.spain }}</td>
                <!-- <td>{{ word.album }}</td> -->
                <td width="75" class="center aligned"><router-link :to="{ name: 'show', params: { id: word._id }}"><i class="eye icon"></i>Show</router-link></td>
                <td width="75" class="center aligned"><router-link :to="{ name: 'edit', params: { id: word._id }}"><i class="edit icon"></i>Edit</router-link></td>
                <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)"><a href="`/words/%{word._id}`"><i class="trash icon"></i>Destroy</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'words',
    data() {
        return {
            words: [],
            selectedCollection: '' // Collection filter
        };
    },
    computed: {
        filteredWord() {
            if (this.selectedCollection === '') return this.words;
            return this.words.filter(word => word.album === this.selectedCollection);
        }
    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.flash('Word delete successfully', 'success');
            this.word = this.words.filter(word => word._id !== id);
        }
    },
    async mounted() {
        this.words = await api.getWords();
    }
};
</script>

<style>
th span {
    display: flex;
    align-items: center;
    gap: 8px;
}

th i.flag {
    font-size: 1.2em;
}

td i.icon {
    display: inline;
    align-items: center;
    gap: 8px;
    font-size: 13px;
}
</style>