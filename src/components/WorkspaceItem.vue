<template>
  <li>
    <RouterLink :to="`/workspaces/${workspace.id}`">
      {{ workspace.title || '제목 없음' }}
    </RouterLink>
    <button @click="workspaceStore.createWorkspace({ parentId: workspace.id })">
      추가
    </button>
    <button @click="workspaceStore.deleteWorkspace(workspace.id)">
      삭제
    </button>
    <ul v-if="workspace.children">
      <WorkspaceItem 
        v-for="w in workspace.children"
        :key="w.id"
        :workspace="w" />
    </ul>
  </li>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  props: {
    workspace: {
      type: Object,
      required: true
    }
  },
  computed: {
     ...mapStores(useWorkspaceStore)
  }
}
</script>
