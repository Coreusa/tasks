<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
  <b-navbar-brand href="#">Notes</b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <b-dropdown-item href="#">##</b-dropdown-item>
        <b-dropdown-item href="#">###2</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>
<script>
export default {
  name: 'MainNav'
}
</script>
