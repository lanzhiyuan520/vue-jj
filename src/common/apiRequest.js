import request from './request'
import {
  login,
  registered,
  signOut,
  getLoginStatus,
  pubArticle,
  getArticle,
  getArticleDetail,
  uploadImg,
  getArticleComments,
  commentArticle,
  changeAvatarUrl,
  searchArticle
} from "@/common/api";

export const loginRequest = data => {
  return request({
    url : login,
    method : 'post',
    data
  })
}
export const registeredRequest = data => {
  return request({
    url : registered,
    method : 'post',
    data
  })
}
export const signOutRequest = () => {
  return request({
    url : signOut,
    method : 'post'
  })
}

export const getLoginStatusRequest = () => {
  return request({
    url : getLoginStatus,
    method : 'post'
  })
}
export const pubArticleRequest = data => {
  return request({
    url : pubArticle,
    method : 'post',
    data
  })
}
export const getArticleRequest = data => {
  return request({
    url : getArticle,
    method : 'post',
    data
  })
}
export const getArticleDetailRequest = data => {
  return request({
    url : getArticleDetail,
    method : 'post',
    data
  })
}
export const uploadImgRequest = data => {
  return request({
    url : uploadImg,
    method : 'post',
    data
  })
}
export const commentArticleRequest = data => {
  return request({
    url : commentArticle,
    method : 'post',
    data
  })
}
export const getArticleCommentsRequest = data => {
  return request({
    url : getArticleComments,
    method : 'post',
    data
  })
}
export const changeAvatarUrlRequest = data => {
  return request({
    url : changeAvatarUrl,
    method : 'post',
    data
  })
}
export const searchArticleRequest = data => {
  return request({
    url : searchArticle,
    method : 'post',
    data
  })
}
