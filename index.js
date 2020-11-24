const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    // 1번째 방법 여기서 axios 후 : ejs
    // 2번째 방법 : axios url이 내 백엔드 : ejs
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
        
        const {decideCnt, deathCnt, clearCnt, examCnt} = r.data.response.body.items.item[0]

        // 어제 : 확진, 사망, 격리해제, 검사중
        const yDecideCnt = r.data.response.body.items.item[1].decideCnt
        const yDeathCnt = r.data.response.body.items.item[1].deathCnt
        const yClearCnt = r.data.response.body.items.item[1].clearCnt
        const yExamCnt = r.data.response.body.items.item[1].examCnt
        // 추가 : 확진, 사망, 격리해제, 검사중
        const plusDecideCnt = decideCnt-yDecideCnt
        const plusDeathCnt = deathCnt-yDeathCnt
        const plusClearCnt = clearCnt-yClearCnt
        const plusExamCnt = examCnt-yExamCnt

        res.render("index", {
            decideCnt,
            plusDecideCnt,
            deathCnt,
            plusDeathCnt,
            examCnt,
            plusExamCnt,
            clearCnt,
            plusClearCnt
        })
    })
})

app.get('/open', (req, res) => {
    res.render("api", {Hello: "1223"})
})

app.listen(port, () => {
    console.log(`Server Open! -> http://localhost:3000`)
})