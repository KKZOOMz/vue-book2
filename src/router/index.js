import Vue from 'vue'
import Router from 'vue-router'
import {Home, Rankings, BookDetail, SearchResult, BookShelf, CateGory, Discover, ReadBook, Search} from '../components/pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/bookshelf', name: 'bookshelf', component: BookShelf},
        {path: '/discover', name: 'discover', component: Discover},
        {path: '/category', name: 'category', component: CateGory},
        {path: '/search', name: 'search', component: Search}
      ]
    },
    {path: '/bookdetail', name: 'bookdetail', component: BookDetail},
    {path: '/readbook', name: 'readbook', component: ReadBook},
    {path: '/rankings', name: 'rankings', component: Rankings},
    {path: '/searchresult', name: 'searchresult', component: SearchResult}
  ]
})
