<template>
  <div class="Home">
    <div class="controls">
      <div class="wrapper">
        <a-button type="primary">Select Files</a-button>
        <FilesExplorer />
      </div>
    </div>
    <FilesList />
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from '@/components/FilesList.vue';
import FilesExplorer from '@/components/FilesExplorer.vue';

export default {
  name: 'Home',
  components: {
    FilesList,
    FilesExplorer,
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
