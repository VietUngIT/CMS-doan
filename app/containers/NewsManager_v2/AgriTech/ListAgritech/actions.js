/*
 *
 * ListAgritech actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION,
  GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_AGRI_TECH_ACTION,
  GET_LIST_AGRI_TECH_ACTION_SUCCESS,
  GET_LIST_AGRI_TECH_ACTION_FAIL,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
  GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION,
  DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
  DELETE_NEWS_AGRI_TECH_ACTION_FAIL,
  ADD_NEWS_AGRI_TECH_ACTION,
  ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
  ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_FAIL,
  UPDATE_TAGS_AG_ACTION,
  UPDATE_TAGS_AG_ACTION_SUCCESS,
  UPDATE_TAGS_AG_ACTION_FAIL,
  UPDATE_IMAGE_NEWS_AG_ACTION,
  UPDATE_IMAGE_NEWS_AG_ACTION_SUCCESS,
  UPDATE_IMAGE_NEWS_AG_ACTION_FAIL,
  UPDATE_NEWS_AG_ACTION,
  UPDATE_NEWS_AG_ACTION_SUCCESS,
  UPDATE_NEWS_AG_ACTION_FAIL,
} from './constants';

export function updateNewsAG(idnews,title,author,idsubcate,content) {
  return {
    type: UPDATE_NEWS_AG_ACTION,
    idnews,
    title,
    author,
    idsubcate,
    content,
  };
}
export function updateNewsAGSuccess(data) {
  return {
    type: UPDATE_NEWS_AG_ACTION_SUCCESS,
    data,
  };
}
export function updateNewsAGFail() {
  return {
    type: UPDATE_NEWS_AG_ACTION_FAIL,
  };
}

export function updateImageAG(image,id) {
  return {
    type: UPDATE_IMAGE_NEWS_AG_ACTION,
    image,
    id,
  };
}
export function updateImageAGSuccess(data) {
  return {
    type: UPDATE_IMAGE_NEWS_AG_ACTION_SUCCESS,
    data,
  };
}
export function updateImageAGFail() {
  return {
    type: UPDATE_IMAGE_NEWS_AG_ACTION_FAIL,
  };
}
export function updateTags(tags,id) {
  return {
    type: UPDATE_TAGS_AG_ACTION,
    tags,
    id,
  };
}
export function updateTagsSuccess(data) {
  return {
    type: UPDATE_TAGS_AG_ACTION_SUCCESS,
    data,
  };
}
export function updateTagsFail() {
  return {
    type: UPDATE_TAGS_AG_ACTION_FAIL,
  };
}

export function addNewsAgriTech(idSubCateLink,title,author,image,tags,idsubcate,content) {
  return {
    type: ADD_NEWS_AGRI_TECH_ACTION,
    idSubCateLink,
    title,
    author,
    image,
    tags,
    idsubcate,
    content,
  };
}
export function addNewsAgriTechSuccess(news,error) {
  return {
    type: ADD_NEWS_AGRI_TECH_ACTION_SUCCESS,
    news,
    error,
  };
}
export function addNewsNotDataAgriTechSuccess(error) {
  return {
    type: ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_SUCCESS,
    error,
  };
}
export function addNewsAgriTechFail(error) {
  return {
    type: ADD_NEWS_AGRI_TECH_NOT_DATA_ACTION_FAIL,
    error,
  };
}
export function deleteNews(id) {
  return {
    type: DELETE_NEWS_AGRI_TECH_ACTION,
    id,
  };
}
export function deleteNewsSuccess(id) {
  return {
    type: DELETE_NEWS_AGRI_TECH_ACTION_SUCCESS,
    id,
  };
}
export function deleteNewsFail() {
  return {
    type: DELETE_NEWS_AGRI_TECH_ACTION_FAIL,
  };
}
  export function getListNewsAgriTech(id,page) {
    return {
      type: GET_LIST_AGRI_TECH_ACTION,
      id,
      page,
    };
  }
  export function getListNewsAgriTechSuccess(listNews,total) {
    return {
      type: GET_LIST_AGRI_TECH_ACTION_SUCCESS,
      listNews,
      total,
    };
  }
  export function getListNewsAgriTechFail() {
    return {
      type: GET_LIST_AGRI_TECH_ACTION_FAIL,
    };
  }
  export function getListSubCateAgriTech(id) {
    console.log("getListSubCateAgriTech: "+id)
    return {
      type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION,
      id,
    };
  }
  export function getListSubCateAgriTechSuccess(data) {
    return {
      type: GET_LIST_SUB_CATE_AGRI_TECH_ACTION_SUCCESS,
      data,
    };
  }
  export function getListCateAgriTech() {
    return {
      type: GET_LIST_CATE_AGRI_TECH_ACTION,
    };
  }
  export function getListCateAgriTechSuccess(data) {
    return {
      type: GET_LIST_CATE_AGRI_TECH_ACTION_SUCCESS,
      data,
    };
  }
  export function defaultAction() {
    return {
      type: DEFAULT_ACTION,
  };
}
