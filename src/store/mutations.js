import * as types from './mutations-types'
import Vue from 'vue'

export default {
  // 监听底部导航栏的改变并改变顶部头部的标题
  [types.CHANGE_NAV_TITLE] (state, name) {
    state.headerTitle = state.titleDesc[name]
  },
  // 将rankings存放到vuex中
  [types.SET_RANKING] (state, rankings) {
    state.rankings = rankings
    // console.log(state.rankings)
  },
  [types.SET_BOOK_SHELF] (state, bookInfo) {
    let flag = true
    state.bookshelf.forEach((val) => {
      if (val._id === bookInfo._id) {
        flag = false
      }
    })
    if (flag) {
      state.bookshelf.push(bookInfo)
    }
    console.log(state.bookshelf)
  },
  [types.SET_CHAPTER] (state, chapter) {
    state.chapter = chapter
    // console.log(state.chapter)
  },
  [types.SET_BOOK_INFO] (state, bookInfo) {
    state.bookInfo = bookInfo
  },
  [types.SET_CONTENT] (state, content) {
    state.content = content
    console.log(state.content)
  },
  [types.SET_INDEX] (state, bookInfo) {
    let flag = false
    state.bookshelf.forEach((val) => {
      if (val._id === bookInfo._id) {
        flag = true
        // Object.assign(this.bookInfo)
      }
    })
    if (flag) {
      let index = state.bookshelf.findIndex(m => {
        return m._id === bookInfo._id
      })
      Vue.set(state.bookshelf[index], 'readedLastChapter', bookInfo.readedLastChapter)
    }
  },
  [types.DEL_BOOK_SHELF] (state, bookInfo) {
    // console.log(bookInfo)
    let index = state.bookshelf.findIndex(m => {
      return m._id === bookInfo._id
    })
    state.bookshelf.splice(index, 1)
    // console.log(state.bookshelf)
  }
}
