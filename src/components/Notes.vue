<template>
  <div class="notes" ref="grid">
    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @action:delete-note="deleteNote($event)"/>
  </div>
</template>

<script>
  import Masonry from 'masonry-layout'
  import {mapActions} from 'vuex'

  import {DELETE_NOTE} from '../types'
  import Note from './Note'

  export default {
    name: 'Notes',
    components: {
      Note
    },
    props: {
      notes: Array
    },
    mounted() {
      const grid = this.$refs.grid
      this.msnry = new Masonry(grid, {
        itemSelector: '.note',
        columnWidth: 200,
        gutter: 10,
        isFitWidth: true
      })
    },
    updated() {
      this.msnry.reloadItems()
      this.msnry.layout()
    },
    beforeDestroy() {
      this.msnry.destroy()
    },
    methods: {
      ...mapActions({
        deleteNote: DELETE_NOTE
      })
    }
  }
</script>

<style scoped>
  .notes {
    margin: 0 auto;
  }
</style>