import { defineStore } from 'pinia'
import router  from '~/routes'

// defineStore('', {})
export const useWorkspaceStore = defineStore('workspace', {
  state() {
    return {
      workspace: {},
      workspaces: [],
      currentWorkspacePath: []
    }
  },
  getters: {

  },
  actions: {
    // CRUD
    async createWorkspace(payload = {}) {
      const { parentId } = payload
      await request({
        method: 'POST',
        body: {
          parentId,
          title: ''
        }
      })
      this.readWorkspaces()
    },
    async readWorkspaces() {
      const workspaces = await request({
        method: 'GET',
      })
      
      this.workspaces = workspaces
    },
    async readWorkspaceDetail(id) {
      const workspace = await request({
        id,
        method: 'GET',
      })

      this.workspace = workspace
    },
    async updateWorkspace(payload) {
      const { id, title, content, poster } = payload

      const updatedWorkspace = await request({
        id,
        method: 'PUT',
        body: {
          title,
          content,
          poster
        }
      })

      this.workspace = updatedWorkspace
      this.readWorkspaces()
    },
    async deleteWorkspace(id) {
      await request({
        id,
        method: 'DELETE'
      })
      this.readWorkspaces()
    },
    findWorkspacePath() {
      // $route를 아래와 같이 쓸 수 있음
      const currentWorkspaceId = router.currentRoute.value.params.id
      function find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          this.currentWorkspacePath = [...parents, workspace]
        }
        if (workspace.children) {
          workspace.children.forEach(ws => {
            find(ws, [...parents], workspace)
          })
        }
      }
      this.workspaces.forEach(workspace => {
        find(workspace, [])
      })
    }
  }
})


async function request(options) {
  const { id='', method, body } = options
  // fetch(url, options)
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'ByeonSeungHun'
    },
    body: JSON.stringify(body)
  })
  return res.json()  
}
