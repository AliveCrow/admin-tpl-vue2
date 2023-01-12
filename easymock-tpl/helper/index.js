const _ = require('lodash')
// const dayjs = require("dayjs");
var convertUrl = exports.convertUrl = function (url) {
  // /restful/:id/:list/{id} -> restful_id_list_id
  // /restful/:id/:list/{id}.json -> restful_id_list_id
  var _url = url
    .replace(/:|{|}/g, '')
    .replace(/-/g, '_')
    .split('/')
    .filter(value => !!value).join('_');
  return _url.split('.')[0];
};

// /mixer/mixerFac/{facEid}/{mixerEid}
exports.convertRESTAPI = function (url) {
  const urlParam = url.match(/(?<={)\w+/g)
  let newStr = url
  if (urlParam && urlParam.length > 0) {
    urlParam.forEach(r => {
      newStr = newStr.replace(/\/\{\w+\}/, '/${' + r + '}')
    })
    return newStr
  } else {
    return url
  }
}


exports.coverParam = function (url) {
  if (url.match(/(?<={)\w+/)) {
    const urlParam = url.match(/(?<={)\w+/g)
    let newStr = ''
    if (!urlParam) {
      return '({opts})'
    } else {
      urlParam.forEach(r => {
        newStr += r + ','
      })
      return `({${newStr} opts})`
      // {
      //   urlParam,
      //   opts: 'opts'
      // }
    }
  } else {
    return '(opts)'
  }
}

exports.convertMethod = function (mock) {
  // 防止重名
  // restful_id_list_id => restful_id_list_id_g
  // or
  // restful_id_list_id => restful_id_list_id_p
  return _.camelCase(convertUrl(mock.url) + '_' + mock.method.toLowerCase())
};

exports.joinUrl = function () {
  // https://www.easy-mock.com//mock/.... => https://www.easy-mock.com/mock/....
  var url = [].slice.call(arguments, 0).join('/');
  url = url.replace(/:\//g, '://');
  url = url.replace(/([^:\s\%\3\A])\/+/g, '$1/');
  return url;
}

exports.isREST = function (url) {
  return /(:|{|})/.test(url);
}

exports.isParam = function (method) {
  return method === 'get' || method === 'delete'
}

// exports.createTime = function () {
//   return dayjs().format('YYYY-MM-DD HH:mm:ss')
// }
