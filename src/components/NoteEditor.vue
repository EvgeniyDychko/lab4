<template>
  <div class="note-editor">
		<textarea
        placeholder="Enter your note here ..."
        rows="5"
        v-model="noteText"></textarea>
    <button
        class="add-button"
        @click="addNote()"
        :disabled="!noteText">Add</button>

    <div class="colors">
      <input v-model="r" type="number" min="0" max="255" title="r">
      <input v-model="g" type="number" min="0" max="255" title="g">
      <input v-model="b" type="number" min="0" max="255" title="b">
    </div>

    <div class="color" :style="{backgroundColor: color}"></div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ADD_NOTE } from '../types'

  export default {
    name: 'NoteEditor',
    data() {
      return {
        noteText: '',
        r: 240,
        g: 100,
        b: 125
      }
    },
    computed: {
      color() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
      }
    },
    methods: {
      ...mapActions({
        addNoteAction: ADD_NOTE
      }),
      async addNote() {
        await this.addNoteAction({ text: this.noteText, bgColor: this.color })
        this.noteText = ''
      }
    }
  }
</script>

<style>
  .note-editor {
    width: 100%;
    max-width: 600px;
    padding: 16px;
    margin: 16px auto;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
  }

  textarea {
    width: 100%;
    resize: none;
    margin: 5px;
    font-size: 14px;
    border: none;
    font-weight: 300;
  }

  textarea:focus {
    outline: 0;
  }

  .add-button {
    align-self: flex-end;
    width: 100px;
    background-color: #44c767;
    border-radius: 8px;
    border: 1px solid #18ab29;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    padding: 8px 8px;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
  }

  .add-button:hover {
    background-color: #5cbf2a;
  }

  .add-button:active {
    position: relative;
    top: 1px;
  }

  .add-button:focus {
    outline: 0;
  }

  .color {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
</style>