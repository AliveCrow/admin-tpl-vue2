import request from '@/utils/request';

// 不要在这里面手动添加api, 生成的api会覆盖
// 不要在这里面手动添加api, 生成的api会覆盖
// 不要在这里面手动添加api, 生成的api会覆盖

<%_.forEach(data.mocks, function(mock){%>/** {{mock.description}} */
function {{$$.convertMethod(mock)}} {{$$.coverParam(mock.url)}} {
  return request({
    method: '{{mock.method}}',
    url: `{{ $$.convertRESTAPI(mock.url) }}`,
    <%if($$.isParam(mock.method)){%>params<%} else {%>data<% }%>: opts,
  })
}
<% }) %>export default {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.convertMethod(mock)}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
}
