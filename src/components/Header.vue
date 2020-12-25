<template>
  <header>
    <button>list-menu</button>
    <h1> Vote Servie for you</h1>
    <button v-on:click="getUserDetail"> {{userName}} </button>
  </header>
</template>

<script>
export default {
    props: ['userName'],
    methods: {
        getUserDetail: function(userName) {
            this.$emit('loadUserDetail')
        }
    }
}
</script>

<style>

</style>