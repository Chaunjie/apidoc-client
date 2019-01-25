<template>
  <div class="home">
    欢迎进入文档系统
  </div>
</template>

<script>
import { session } from '@/utils'
export default {
  name: 'home',
  mounted () {
    const projectId = this.$route.params.id
    session.setItem('projectId', projectId)
  }
}
</script>
