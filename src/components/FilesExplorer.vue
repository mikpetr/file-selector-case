<template>
  <div class="FilesExplorer">
    <div class="header">
      <div
        v-if="currentFolder && currentFolder.parentFolder"
        @click="goBack"
        role="button"
        class="button back"
      >
        <a-icon type="arrow-left" />
      </div>
      <div class="title">{{currentFolder && currentFolder.name}}</div>
      <div @click="close" role="button" class="button close">
        <a-icon type="close" />
      </div>
    </div>
    <div v-if="!currentFolder" class="loading">
      <a-icon type="loading" />
    </div>
    <FilesExplorerFilesList
      v-else
      :currentFolder="currentFolder"
      :selectedFiles="selectedFiles"
      @enterFolder="enterFolder"
      @toggleFile="toggleFile"
    />
    <div class="controls">
      <a-button @click="submitFiles" type="primary" :disabled="!selectedFilesCount">
        Select {{selectedFilesCount || ''}} files
      </a-button>
    </div>
  </div>
</template>

<script>
import folderStructureApi from '@/api/folderStructureApi';
import FilesExplorerFilesList from './FilesExplorerFilesList.vue';

export default {
  name: 'FilesExplorer',
  props: {
    value: Array,
  },
  components: {
    FilesExplorerFilesList,
  },
  data() {
    return {
      selectedFiles: {},
      currentFolder: null,
    };
  },
  computed: {
    selectedFilesCount() {
      return Object.keys(this.selectedFiles).length;
    },
  },
  created() {
    if (this.value) {
      this.value.forEach((file) => {
        this.$set(this.selectedFiles, file.id, file);
      });
    }
  },
  async mounted() {
    const { data } = await folderStructureApi.get();

    this.enterFolder(data);
  },
  methods: {
    enterFolder(folder) {
      this.currentFolder = {
        parentFolder: this.currentFolder,
        ...folder,
      };
    },
    goBack() {
      this.currentFolder = this.currentFolder.parentFolder;
    },
    fileIsSelected(fileId) {
      return !!this.selectedFiles[fileId];
    },
    toggleFile(file) {
      if (this.fileIsSelected(file.id)) {
        this.$delete(this.selectedFiles, file.id);
      } else {
        this.$set(this.selectedFiles, file.id, file);
      }
    },
    submitFiles() {
      const filesArray = Object.keys(this.selectedFiles).map(
        (fileId) => this.selectedFiles[fileId],
      );

      this.$emit('input', filesArray);
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.FilesExplorer {
  width: 420px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;

  .loading {
    font-size: 30px;
    text-align: center;
    padding: 35px 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;

    .title {
      font-size: 20px;
      line-height: 44px;
      font-weight: 500;
      flex-basis: calc(100% - 88px);
      text-align: left;
      margin-left: 14px;
    }

    .button {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      line-height: 44px;
      text-align: center;

      &.back {
        margin-right: -14px;
      }
    }
  }

  .controls {
    text-align: right;
    margin-bottom: 8px;
    margin-right: 8px;
  }
}
</style>
