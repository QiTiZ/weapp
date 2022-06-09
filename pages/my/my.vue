<template>
  <view>
    <my-login v-if="!token"></my-login>

    <my-user v-else></my-user>
  </view>
</template>

<script>
import setInfo from '@/mixins/tabbarInfo.js'
import { mapState } from 'vuex'
export default {
  mixins: [setInfo],
  data() {
    return {}
  },
  computed: { ...mapState('user', ['token']) }
}
</script>

<style lang="scss"></style>
