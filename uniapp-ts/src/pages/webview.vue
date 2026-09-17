<script lang="ts" setup>
import { useQuery } from '@/libs/hooks/useQuery'

const url = useQuery('url')
</script>

<template>
  <web-view :src="url" />
</template>

<style lang="scss" scoped></style>
