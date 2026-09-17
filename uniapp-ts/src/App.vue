<script setup lang="ts">
import { updateApp } from './utils/update'

onLaunch(() => {
  updateApp()
})
</script>

<style></style>
