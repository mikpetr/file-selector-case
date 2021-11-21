<template>
  <div class="FilesExplorer">
    <div class="header">
      <div role="button" class="button back">
        <a-icon type="arrow-left" />
      </div>
      <div class="title">Exposé material</div>
      <div role="button" class="button close">
        <a-icon type="close" />
      </div>
    </div>
    <ul class="list">
      <!-- Folder -->
      <li role="button" class="row">
        <div class="icon-left">
          <a-icon type="folder" />
        </div>
        <div class="name">folder</div>
        <div class="icon-right">
          <a-icon type="right" />
        </div>
      </li>
      <!-- File not selected -->
      <li role="button" class="row">
        <div class="icon-left">
          <!-- <a-icon type="folder" /> -->
          <img src="../assets/image.jpeg" />
        </div>
        <div class="name">Folder</div>
        <!-- <div class="icon-right">
          <a-icon type="right" />
        </div> -->
      </li>
      <li role="button" class="row">
        <div class="icon-left">
          <!-- <a-icon type="folder" /> -->
          <img src="../assets/image.jpeg" />
        </div>
        <div class="name">Folder</div>
        <div class="icon-right">
          <a-icon type="check-circle" theme="filled" class="check" />
        </div>
      </li>
    </ul>
    <div class="controls">
      <a-button type="primary" disabled>Select 12 files</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilesExplorer',
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

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;

    .title {
      font-size: 20px;
      line-height: 44px;
      font-weight: 500;
    }

    .button {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      line-height: 44px;
      text-align: center;
    }
  }

  .list {
    margin-bottom: 16px;
    min-height: 256px;

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

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: inherit;
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
          font-size: 17px;
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
