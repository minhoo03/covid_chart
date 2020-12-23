const express = require('express')
const app = express()
const port = 3003

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("./public"));
app.set('view engine', 'ejs')
// 그 후 var data에 for문을 이용해(템플릿) 배열에 담아줌

app.get('/', async (req, res) => {
    const axios = require('axios')
    const API_KEY1 = "bvHlHvhI6d51c5PgwKlq50EiAEzxy%2BOmsymQThKuLlGGsqWYIGz8gxAdItSOSFVXzfRvMlWMnps1wg9M5x%2F0%2Fw%3D%3D";

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    if(date < 10){
        date = `0${date}`
    }

    let day = `${year}${month}${date}`
    let day_2 = day-2
    let day2 = `${year}.${month}.${date}`



    // 막날, 첫날은 다음 달로 계산되는 것이 오류남..
    const getCovidData = async () => {
        const data = await axios.get(
            `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson`,
            {
                params: {
                    // encode
                    serviceKey: decodeURIComponent(API_KEY1),
                    pageNo: 1,
                    numOfRows: 10,
                    startCreateDt: day_2,
                    endCreateDt: day
                }
            }
        )
        console.log(day)
        console.log(day-2)
        
        return data
    }


    // covid data
    const result = await new Promise((resolve, reject) => {
        getCovidData().then(r => {
            // 1 : 오늘, 2 : 어제
            const [
                { decideCnt: decideCnt1, deathCnt: deathCnt1, clearCnt: clearCnt1, examCnt: examCnt1 },
                { decideCnt: decideCnt2, deathCnt: deathCnt2, clearCnt: clearCnt2, examCnt: examCnt2 }
            ] = r.data.response.body.items.item

            // r.data...item[0][1] 와 같다

            // 추가 OO자
            const plusDecideCnt = decideCnt1 - decideCnt2
            const plusDeathCnt = deathCnt1 - deathCnt2
            const plusExamCnt = examCnt1 - examCnt2
            const plusClearCnt = clearCnt1 - clearCnt2
            

            // resolve -> return
            resolve({
                decideCnt: decideCnt1,
                deathCnt: deathCnt1,
                examCnt: examCnt1,
                clearCnt: clearCnt1,
                plusDecideCnt,
                plusDeathCnt,
                plusExamCnt,
                plusClearCnt,
            })
        })
    })

    // rendering -> result 모든 데이터
    res.render("index", { ...result, day2 })
})

app.listen(port, () => {
    console.log(`Server Open! -> http://localhost:${port}`)
})
