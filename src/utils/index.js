/**
 * 动态引入组件
 * @param view
 * @returns {function(*): any}
 */
export function loadView(view) {
	console.log(`@/views${view}`);
	return (resolve) => require([`@/views${view}`], resolve
	)
}
