<template lang='pug'>
  #app
    router-view
</template>

<script>
import 'normalize.css'
export default {
  name: 'app'
}
</script>

<style lang='scss'>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab");
@import url('https://fonts.googleapis.com/css?family=Roboto:900');
html {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  font-family: 'Roboto Slab', serif;
  color: #7990a8;
}

img.responsive {
  width: 100%;
  height: auto;
}

.box {
  margin: 1rem 1rem 2rem 1rem;
  box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
}

.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
</style>
