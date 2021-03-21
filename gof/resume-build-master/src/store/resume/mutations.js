export default {
  move (state, { start, end }) {
    let data = state.content.mainContent.splice(start, 1)
    state.content.mainContent.splice(end, 0, data[0])
  },
  otherMove (state, { start, end }) {
    let data = state.content.otherContent.splice(start, 1)
    state.content.otherContent.splice(end, 0, data[0])
  },
  changeStyle (state, payload) {
    state.style = { ...state.style, ...payload }
  },
  changeTemplate (state,{ templateId }) {
    state.resumeType = templateId
  },
  remove (state, { isMain, idx }) {
    if (isMain) {
      state.content.mainContent.splice(idx, 1)
    } else {
      state.content.otherContent.splice(idx, 1)
    }
  },
  addModule (state, { data }) {
    if (data.text === '个人技能' || data.text === '个人标签') {
      state.content.otherContent.push(data)
    } else {
      state.content.mainContent.push(data)
    }
  },
  addModule2 (state, { idx, data, isMain }) {
    if (isMain) {
      state.content.mainContent.splice(idx, 0, data)
    } else {
      state.content.otherContent.splice(idx, 0, data)
    }
  },
  changeScrollTop (state) {
    state.scrollTop = !state.scrollTop
  },
  changeBaseMessage (state, payload) {
    state.content.baseMessage = { ...state.content.baseMessage, ...payload }
  },
  changeMainContent (state, { idx, data }) {
    state.content.mainContent.splice(idx, 1, data)
  },
  changeOtherContent (state, { idx, data }) {
    state.content.otherContent.splice(idx, 1, data)
  },
  changeAllData(state, payload) {
    delete payload.type
    for (var item in payload) {
      state[item] = payload[item]
    }
  }

}
