<template>
  <div class="FilesList">
    <p class="title">Files selected</p>
    <ul class="list">
      <li>Room 1.png</li>
      <li>Room 2.png</li>
      <li>Room 3.png</li>
      <li>Room with very very very very very very very very very long name so that it cuts at</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilesList',
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
