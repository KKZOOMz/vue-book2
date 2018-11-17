import axios from 'axios'
import * as types from './mutations-types'

export default {
  getRanking({commit}) {
    axios.get('/api/ranking')
      .then(res => {
        res = res.data
        // console.log(res, 'rankingget')
        if (res.ok) {
          commit(types.SET_RANKING, res.rankings)
        }
      })
  }
}
