<template>
  <form action="#" @submit.prevent="onSubmit">
     <p v-if="errorsPresent" class="error">Please fill all fields!</p>

     <div class="ui labeled input fluid">
      <div class="ui label">Collection</div>
      <select v-model="word.album" class="ui dropdown">
        <option value="">Select Collection</option>
        <option value="greetings">Greetings</option>
        <option value="numbers">Numbers</option>
        <option value="animals">Animals</option>
        <option value="others">Others</option>
      </select>
     </div>
 
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="germany flag"></i> German
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.german" />
     </div>
 
     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="united kingdom flag"></i> English
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.english" />
     </div>

     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="france flag"></i> France
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.france" />
     </div>

     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="spain flag"></i> Spain
       </div>
       <input type="text" placeholder="Enter word..." v-model="word.spain" />
     </div>
 
     <button class="positive ui button">Submit</button>
   </form>
 </template>
 
 <script>
 export default {
   name: 'word-form',
   props: {
     word: {
       type: Object,
       required: false,
       default: () => ({
        english: '',
        german: '',
        france: '',
        spain: '',
        album: ''
       })
     }
   },
   data() {
     return {
       errorsPresent: false
     };
   },
   methods: {
     onSubmit: function() {
        if (this.word.english === '' || this.word.german === '' || this.word.france === '' || this.word.spain === '' || this.word.album === '') {
            this.errorsPresent = true;
        } else {
            this.$emit('createOrUpdate', this.word);
            // console.log(`English: ${this.word.english}`);
            // console.log(`German: ${this.word.german}`);
        }
     }
   }
 };
 </script>
 
 <style scoped>
 .error {
   color: red;
 }
 </style>