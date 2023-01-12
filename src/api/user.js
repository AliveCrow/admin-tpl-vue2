import request from "@/utils/request";

function login({username, password}) {
	return request({
		method: "POST",
		url: "/login",
		data: {
			username,
			password,
		},
	});
}

function getUserInfo() {
	return request({
    method: "GET",
    url: "/user/info",
  });
}

function getPermission() {
	return request({
		method: 'GET',
		url: '/user/permission'
	})
}


export default {
	login,
	getUserInfo,
	getPermission
}
