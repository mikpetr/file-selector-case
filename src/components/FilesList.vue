<template>
  <div class="FilesList">
    <p class="title">{{ files.length ? 'Files selected' : 'No files selected' }}</p>
    <ul class="list">
      <li v-for="file in files" :key="file.id">{{file.name}}</li>
    </ul>
  </div>
</template>

<script>
// UNIT TEST: check if list is rendered correctly

export default {
  name: 'FilesList',
  props: {
    files: Array,
  },
};
</script>

<style lang="scss" scoped>
.FilesList {
  max-width: 496px;
  margin: 0 auto;

  .title {
    font-weight: 500;
    margin-bottom: 7px;
    line-height: 19px;
  }

  ul.list {
    li {
      line-height: 19px;
      margin-bottom: 7px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
