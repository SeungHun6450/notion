<template>
  <TheHeader />
  <h1>Workspace!</h1>
  <button @click="workspaceStore.createWorkspace">
    Workspace 생성
  </button>
  
  <section :key="$route.params.id">
    <div class="poster">
      <img
        v-if="workspaceStore.workspace.poster"
        :src="workspaceStore.workspace.poster"
        alt="Poster" />
      <input
        type="file"
        @change="selectPoster" />
      <button @click="deletePoster">
        이미지 삭제
      </button>
    </div>
    <h1
      ref="title"
      placeholder="제목 없음"
      contenteditable
      @keydown.prevent.enter="$refs.content.focus()"
      @blur="onInput">
      {{ workspaceStore.workspace.title }}
    </h1>
    <p
      ref="content"
      placeholder="내용을 입력하세요!"
      contenteditable
      @blur="onInput"
      v-html="workspaceStore.workspace.content"></p>
  </section>

  <input
    type="text"
    @change="onInput" />
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
      ...mapStores(useWorkspaceStore)
  },
  watch: {
      $route() {
          this.workspaceStore.readWorkspaceDetail(this.$route.params.id)
      }
  },
  created() {
      this.workspaceStore.readWorkspaceDetail(this.$route.params.id)
  },
  methods: {
      onInput() {
          // 안의 내용을 알아내는 방식
          // const title = event.target.value
          // contenteditable에서는 아래와 같이 사용할 수 있다.
          const title = this.$refs.title.textContent
          const content = this.$refs.content.innerHTML
          if (!title.trim()) {
              this.$refs.title.innerHTML = ''
          }
          if (!content.trim()) {
              this.$refs.content.innerHTML = ''
          }
          this.workspaceStore.updateWorkspace({
              id: this.$route.params.id,
              title,
              content
          })
      },
      selectPoster(event) {
          const { files } = event.target
          for (const file of files) {
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.addEventListener('load', e => {
                  this.workspaceStore.updateWorkspace({
                      id: this.$route.params.id,
                      poster: e.target.result
                  })
              })
          }
      },
      deletePoster() {
          this.workspaceStore.updateWorkspace({
              id: this.$route.params.id,
              poster: '-1'
          })
      }
  }
}
</script>

<style lang="scss" scoped>
// 속성 선택자
// contenteditable속성을 가진 요소가 내용이 비워지면(없으면), 내부의 앞쪽에 가상 요소를 만들어 placeholder를 채워라
[contenteditable] {
  &:empty::before {
    content: attr(placeholder);
    color: #d3d3d3;
  }
}
</style>
