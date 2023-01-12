import request from '@/utils/request';

// 不要在这里面手动添加api, 生成的api会覆盖
// 不要在这里面手动添加api, 生成的api会覆盖
// 不要在这里面手动添加api, 生成的api会覆盖

/** 用户权限表 */
function userPermissionGet (opts) {
  return request({
    method: 'get',
    url: `/user/permission`,
    params: opts,
  })
}
/** 个人信息 */
function userInfoGet (opts) {
  return request({
    method: 'get',
    url: `/user/info`,
    params: opts,
  })
}
/** 登陆 */
function loginPost (opts) {
  return request({
    method: 'post',
    url: `/login`,
    data: opts,
  })
}
export default {
  userPermissionGet,
  userInfoGet,
  loginPost
}
