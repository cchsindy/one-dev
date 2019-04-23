<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li><RouterLink to="/">Dashboard</RouterLink></li>
        <li><RouterLink to="/announcements">Announcements</RouterLink></li>
        <li><RouterLink to="/blackbaud">Blackbaud</RouterLink></li>
        <li><RouterLink to="/canvas">Canvas</RouterLink></li>
        <li><RouterLink to="/volunteer">Volunteer</RouterLink></li>
      </ul>
    </div>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald');
@import url('https://fonts.googleapis.com/css?family=Work+Sans');
@import url('https://fonts.googleapis.com/css?family=Work+Sans:700');

html, body {
  margin: 0;
  padding: 0;
}
h1, h2, h3 {
  color: #429AB5;
  font-family: Oswald, sans-serif;
  text-decoration: underline;
  text-transform: uppercase;
}
#app {
  font-family: 'Work Sans', sans-serif;
}
.content {
  padding: 2vh;
}
.nav {
  background: #D58833;
  font-weight: 700;
  padding: 2vh;
}
.nav ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav a {
  color: #444;
  text-decoration: none;
}
</style>
