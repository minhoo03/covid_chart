const axios = require('axios')
const API_KEY = "v1RFHI4C5i6RNYGvk3dc6cr076n%2F6QEkOlyeqo41C%2BlUkSugAF2UZ8qjsg3eTIRacKJ7QCsX2aYa%2B1Thz8EWKQ%3D%3D";

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1; 
let date = today.getDate(); 
let day = `${year}${month}${date}`

const getCovidData = async () => {
    const data = await axios.get(
        `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson`,
        {params: {
            // encode
            serviceKey: decodeURIComponent(API_KEY),
            pageNo: 1,
            numOfRows: 10,
            startCreateDt: day-2,
            endCreateDt: day
        }}
    )
    return data
}
// await을 바깥에 감쌀 땐 then
// covid data
getCovidData().then(r => {
    
    // 확진
    let todayInfected = r.data.response.body.items.item[0].decideCnt
    let yesterdayInfected = r.data.response.body.items.item[1].decideCnt
    // 사망자
    let todayDeath = r.data.response.body.items.item[0].deathCnt
    let yesterdayDeath = r.data.response.body.items.item[1].deathCnt
    // 격리 해제
    let todayQuarantineRelease = r.data.response.body.items.item[0].clearCnt
    let yesterdayQuarantineRelease = r.data.response.body.items.item[1].clearCnt
    // 검사진행
    let todayExamine = r.data.response.body.items.item[0].examCnt
    let yesterdayExamine = r.data.response.body.items.item[1].examCnt

    // 추가
    let plusInfected = todayInfected-yesterdayInfected
    let plusDeath = todayDeath-yesterdayDeath
    let plusQuarantineRelease = todayQuarantineRelease-yesterdayQuarantineRelease
    let plusExamine = todayExamine-yesterdayExamine

    console.log(`오늘 확진자 : ${todayInfected}`)
    console.log(`추가 확진자 : ${plusInfected}`)
    console.log(`총 사망자 : ${todayDeath}`)
    console.log(`추가 사망자 : ${plusDeath}`)
    console.log(`오늘 격리 해제 : ${todayQuarantineRelease}`)
    console.log(`추가 격리 해제 : ${plusQuarantineRelease}`)
    console.log(`검사진행 : ${todayExamine}`)
    console.log(`추가 검사 : ${plusExamine}`)

    // res.render("index", {
    //     decideCnt: `${decideCnt}`,
    //     plusDecideCnt: `${plusDecideCnt}`,
    //     deathCnt: `${deathCnt}`,
    //     plusDeathCnt: `${plusDeathCnt}`,
    //     examCnt: `${examCnt}`,
    //     plusExamCnt: `${plusExamCnt}`,
    //     clearCnt: `${clearCnt}`,
    //     plusClearCnt: `${plusClearCnt}`
    // })
})