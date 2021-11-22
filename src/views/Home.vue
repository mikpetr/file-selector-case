<template>
  <div class="Home">
    <div class="controls">
      <div class="wrapper">
        <a-button @click="openExplorer" type="primary">Select Files</a-button>
        <FilesExplorer
          v-if="explorerIsOpen"
          :value="filesList"
          @input="listFiles"
          @close="closeExplorer"
        />
      </div>
    </div>
    <FilesList :files="filesList" />
  </div>
</template>

<script>
// UNIT TEST: check if file explorer opened after clicking the button
// UNIT TEST: check if file explorer closed when "close" event triggers on FilesExplorer component
// UNIT TEST: check if list is updated when "input" event triggers on FilesExplorer component

// @ is an alias to /src
import FilesList from '@/components/FilesList.vue';
import FilesExplorer from '@/components/FilesExplorer.vue';

export default {
  name: 'Home',
  data() {
    return {
      explorerIsOpen: false,
      filesList: [],
    };
  },
  components: {
    FilesList,
    FilesExplorer,
  },
  methods: {
    openExplorer() {
      this.explorerIsOpen = true;
    },
    closeExplorer() {
      this.explorerIsOpen = false;
    },
    listFiles(filesList) {
      this.filesList = filesList;
    },
  },
};
</script>

<style lang="scss" scoped>
.Home {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 124px;

  .controls {
    text-align: center;
    margin-bottom: 32px;

    button {
      cursor: pointer;
    }

    .wrapper {
      display: inline-block;
      position: relative;

      .FilesExplorer {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
