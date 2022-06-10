import { defineStore } from 'pinia'

// defineStore('', {})
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {

    }
  },
  getters: {

  },
  actions: {
    // CRUD
    async createWorkspace() {
      // fetch(url, options)
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': '<ByeonSeungHun>'
        },
        body: JSON.stringify({
          // parentId: '',
          title: '처음 만드는 Notion Workspace',
          content: '처음 만드는 내용',
          // poster: ''
        })
      })
      const workspace = await res.json()
      console.log(workspace)
    }
  }
})
