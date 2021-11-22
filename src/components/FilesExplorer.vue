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
    <ul class="list" v-else>
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
      <li v-if="folderIsEmpty" class="empty-folder">Folder is empty</li>
    </ul>
    <div class="controls">
      <a-button @click="submitFiles" type="primary" :disabled="!selectedFilesCount">
        Select {{selectedFilesCount || ''}} files
      </a-button>
    </div>
  </div>
</template>

<script>
import folderStructureApi from '@/api/folderStructureApi';

const previewSupportedTypes = [
  'image/jpeg',
  'image/png',
];

const supportedFileTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];

export default {
  name: 'FilesExplorer',
  props: {
    value: Array,
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

      console.log(folder);
    },
    goBack() {
      this.currentFolder = this.currentFolder.parentFolder;
    },
    toggleFile(file) {
      if (this.fileIsSelected(file.id)) {
        this.$delete(this.selectedFiles, file.id);
      } else {
        this.$set(this.selectedFiles, file.id, file);
      }
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
$hover-color: rgba(0, 0, 0, 0.04);
$active-color: rgba(0, 0, 0, 0.08);

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

  .list {
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
  }

  .empty-folder {
    text-align: center;
  }

  .controls {
    text-align: right;
    margin-bottom: 8px;
    margin-right: 8px;
  }

  [role="button"] {
    cursor: pointer;
  }
  [role="button"]:hover {
    background-color: $hover-color;
  }
  [role="button"]:active {
    background-color: $active-color;
  }
}
</style>
