// camera
var mapOptions = {
    center: new naver.maps.LatLng(37.550027, 126.992739),
    zoom: 13
};
// map 삽입
var map = new naver.maps.Map('map', mapOptions);

// i번지 marker, windowInfo 담기
var markerList = []
var infoWindowList = []


// for(var i in data){
//   // 좌표를 가진 data.. i번지 마다 마커
//   var target = data[i]
//   var latlng = new naver.maps.LatLng(target.lat, target.lng)
//   marker = new naver.maps.Marker({
//     map : map,
//     position : latlng,
//     icon : {
//       content: "<div class='marker'></div>",
//       anchor : new naver.maps.Point(12,12)
//       // w24, h24의 중심 12,12
//     }
//   })
// }