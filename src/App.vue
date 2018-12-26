<template>
  <div id="app">
    <h2 class="app-header">NotesApp!!!</h2>
    <NoteEditor/>
    <Notes :notes="notesFiltered"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { FETCH_NOTES, NOTES } from './types'

  import NoteEditor from './components/NoteEditor.vue'
  import Notes from './components/Notes'

  export default {
    name: 'app',
    components: {
      NoteEditor,
      Notes
    },
    data() {
      return {
        hash: window.location.hash
      }
    },
    computed: {
      ...mapGetters({
        notes: NOTES
      }),
      notesParsedHashes() {
        return this.notes.map(item => this.replace(item))
      },
      notesFiltered() {
        return this.hash ? this.notesParsedHashes.filter(item => item.hashes.includes(this.hash)) : this.notesParsedHashes
      }
    },
    mounted() {
      const listener = () => {
        this.hash = window.location.hash;
      }

      window.addEventListener('hashchange', listener)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('hashchange', listener)
      })

      this.fetchNotes()
    },
    methods: {
      ...mapActions({
        fetchNotes: FETCH_NOTES
      }),
      replace(item) {
        const text = item.text;
        const hashes = [];

        const newText = text.replace(/(#\w+)/g, (hash) => {
          hashes.push(hash);
          return `<a href='${hash}'>${hash}</a>`
        })

        return {
          ...item,
          text: newText,
          hashes
        }
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    font-weight: 300;
    background-color: #eaeaea;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
  }

  .app-header {
    text-align: center;
    font-weight: 500;
    color: grey;
    text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
  }
</style>
