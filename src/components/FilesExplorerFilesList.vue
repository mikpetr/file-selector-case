<template>
  <ul class="FilesExplorerFielesList">
    <!-- Folders -->
    <li
      v-for="folder in currentFolder.folders"
      :key="folder.id"
      role="button"
      class="row folder"
      @click="enterFolder(folder)"
    >
      <div class="icon-left">
        <a-icon type="folder" />
      </div>
      <div class="name">{{folder.name}}</div>
      <div class="icon-right">
        <a-icon type="right" />
      </div>
    </li>

    <!-- Files -->
    <li
      v-for="file in currentFolderFiles"
      :key="file.id"
      role="button"
      class="row file"
      @click="toggleFile(file)"
    >
      <div class="icon-left">
        <img
          v-if="filePreviewIsSupported(file.mimeType)"
          :src="file.url"
          @error="handleFileError"
        />
        <div class="image-alternative">
          <a-icon type="file-image" />
        </div>
      </div>
      <div class="name">{{file.name}}</div>
      <div class="icon-right" v-if="fileIsSelected(file.id)">
        <a-icon type="check-circle" theme="filled" class="check" />
      </div>
    </li>
    <li v-if="folderIsEmpty" class="empty-folder">Folder is empty.</li>
  </ul>
</template>

<script>
const supportedFileTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];

const previewSupportedTypes = [
  'image/jpeg',
  'image/png',
];

export default {
  name: 'FilesExplorerFilesList.vue',
  props: {
    currentFolder: Object,
    selectedFiles: Object,
  },
  computed: {
    currentFolderFiles() {
      return (
        this.currentFolder
        && Array.isArray(this.currentFolder.files)
        && this.currentFolder.files.filter((file) => supportedFileTypes.includes(file.mimeType))
      );
    },
    folderIsEmpty() {
      return !this.currentFolderFiles.length && !this.currentFolder.folders.length;
    },
  },
  methods: {
    enterFolder(folder) {
      this.$emit('enterFolder', folder);
    },
    toggleFile(file) {
      this.$emit('toggleFile', file);
    },
    fileIsSelected(fileId) {
      return !!this.selectedFiles[fileId];
    },
    filePreviewIsSupported(mimeType) {
      return previewSupportedTypes.includes(mimeType);
    },
    handleFileError(e) {
      e.target.style.display = 'none';
    },
  },
};
</script>

<style lang="scss" scoped>
.FilesExplorerFielesList {
  margin-bottom: 16px;
  height: 256px;
  overflow-y: auto;

  .row {
    display: flex;
    padding: 8px;
    border-radius: 8px;

    .icon-left, .icon-right {
      width: 28px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      display: block;
      box-sizing: border-box;
    }

    .icon-left {
      color: #767676;
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      font-size: 14px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &.file {
      .icon-left {
        position: relative;

        img {
          width: inherit;
          height: inherit;
          object-fit: cover;
          display: block;
          border-radius: inherit;
          position: absolute;
          z-index: 2;
          background-color: white;
        }

        .image-alternative {
          width: inherit;
          height: inherit;
          position: absolute;
          z-index: 1;
          margin: auto;
          left: 0;
          top: 0;
        }
      }
    }

    &:active {
      .icon-left {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }

    .icon-right {
      .check {
        color: #2265F1;
        font-size: 16px;
      }
    }

    .name {
      line-height: 28px;
      flex-basis: calc(100% - 56px);
      padding-left: 12px;
      text-align: left;
    }
  }

  .empty-folder {
    text-align: center;
  }
}
</style>
