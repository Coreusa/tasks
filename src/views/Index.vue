<template>
  <div class="row no-gutters">
    <div class="col-12">
      <MainNav />
      <Cards />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cards from '@/components/Cards.vue'
import MainNav from '@/components/MainNav.vue'

export default {
  name: 'Front',
  components: {
    Cards,
    MainNav
  }
}
</script>
