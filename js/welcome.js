// calendar page로 이동하는 클릭이벤트
const creatingOnClickHandle = () => {
    Routes.getInstance().routeState = "calendar"
    Routes.getInstance().show();
}