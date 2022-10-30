<template>
  <div class="container-header">
    <nav>
      <ul class="nav-menu">
        <li><a id="logo" href="." rel="home">POKEDEX</a></li>
        <li>
          <a id="linkOne" href="#thingOne">GroKedex</a>
        </li>
        <li>
          <a id="linkTwo" href="#thingTwo">Pokedex</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
nav {
  padding: 2rem 0 2rem 0;
  border-bottom: 1px solid black;
  background: radial-gradient(ellipse at center, #3d3d3d 0%, #1e1e1e 57%);
}
ul.nav-menu {
  padding: 0;
  display: flex;
  justify-content: space-evenly;
}
li {
  list-style: none;
}
@media (min-width: 1024px) {
}
</style>
