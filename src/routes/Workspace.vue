<template>
  <h1>Workspace!</h1>
  <button @click="workspaceStore.createWorkspace">
    Workspace 생성
  </button>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore)
  }
}
</script>
