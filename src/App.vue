<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Calibre";
  src: url("~@/assets/calibre-web-regular.woff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Calibre";
  src: url("~@/assets/calibre-web-medium.woff");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "SF-Pro";
  src: url("~@/assets/sf-pro-display-regular.woff");
  font-weight: 400;
  font-style: normal;
}

$hover-color: rgba(0, 0, 0, 0.04);
$active-color: rgba(0, 0, 0, 0.08);

#app {
  font-family: Calibre, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262626;
  font-size: 16px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

button {
  font-family: SF-Pro;
  padding: 5px 16px;
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

</style>
