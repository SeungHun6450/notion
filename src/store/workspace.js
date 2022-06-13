import { defineStore } from 'pinia'

// defineStore('', {})
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {
      workspace: {},
      workspaces: []
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
          'username': 'ByeonSeungHun'
        },
        body: JSON.stringify({
          // parentId: '',
          title: '처음 만드는 Notion Workspace2',
          content: '처음 만드는 내용',
          // poster: ''
        })
      })
      const workspace = await res.json()
      console.log(workspace)
      this.readWorkspaces()
    },
    async readWorkspaces() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ByeonSeungHun'
        }
      })
      const workspaces = await res.json()
      console.log(workspaces) 
      
      this.workspaces = workspaces
    },
    async readWorkspaceDetail(id) {
      const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ByeonSeungHun'
        }
      })
      const workspace = await res.json()
      console.log(workspace)

      this.workspace = workspace
    },
    async updateWorkspace(payload) {
      const { id, title, content } = payload
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ByeonSeungHun'
        },
        body: JSON.stringify({
          title,
          content
        })
      })
      
      this.readWorkspaces()
    },
    async deleteWorkspace(id) {
      await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'ByeonSeungHun'
        }
      })
      this.readWorkspaces()
    }
  }
})
