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

    if(month < 10){
        month = `0${month}`
    }

    let day = `${year}${month}${date}`
    let day_2 = `${year}${month}${date-5}`
    let day2 = `${year}.${month}.${date}`


    let test = 38001



    // 막날, 첫날은 다음 달로 계산되는 것이 오류남..
    const getCovidData = async () => {
        const data = await axios.get(
            `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson`,
            {params: {
                // encode
                serviceKey: decodeURIComponent(API_KEY1),
                pageNo: 1,
                numOfRows: 10,
                startCreateDt: day_2,
                endCreateDt: day
            }}
        )

      
        return data
    }


    // covid data
    const result = await new Promise((resolve, reject) => {
        getCovidData().then(r => {
            // 1 : 오늘, 2 : 어제
            const [
                { decideCnt: decideCnt1, deathCnt: deathCnt1, clearCnt: clearCnt1, examCnt: examCnt1 },
                { decideCnt: decideCnt2, deathCnt: deathCnt2, clearCnt: clearCnt2, examCnt: examCnt2 },
                { decideCnt: decideCnt3, deathCnt: deathCnt3, clearCnt: clearCnt3, examCnt: examCnt3 },
                { decideCnt: decideCnt4, deathCnt: deathCnt4, clearCnt: clearCnt4, examCnt: examCnt4 },
                { decideCnt: decideCnt5, deathCnt: deathCnt5, clearCnt: clearCnt5, examCnt: examCnt5 }
            ] = r.data.response.body.items.item


            console.log(r.data)


            // const { decideCnt: decideCnt1, deathCnt: deathCnt1, clearCnt: clearCnt1, examCnt: examCnt1 } = r.data.response.body.items.item[0]
            // const { decideCnt: decideCnt2, deathCnt: deathCnt2, clearCnt: clearCnt2, examCnt: examCnt2 } = r.data.response.body.items.item[1]


            // r.data...item[0][1] 와 같다

            // 추가 OO자
            const plusDecideCnt = decideCnt1 - decideCnt2
            const plusDeathCnt = deathCnt1 - deathCnt2
            const plusExamCnt = examCnt1 - examCnt2
            const plusClearCnt = clearCnt1 - clearCnt2
            

            // resolve -> return
            resolve({
                decideCnt1: decideCnt1,
                deathCnt1: deathCnt1,
                examCnt1: examCnt1,
                clearCnt1: clearCnt1,
                plusDecideCnt,
                plusDeathCnt,
                plusExamCnt,
                plusClearCnt,
                decideCnt2: decideCnt2,
                deathCnt2: deathCnt2,
                examCnt2: examCnt2,
                clearCnt2: clearCnt2,
                decideCnt3: decideCnt3,
                deathCnt3: deathCnt3,
                clearCnt3: clearCnt3,
                examCnt3: examCnt3,
                decideCnt4: decideCnt4,
                deathCnt4: deathCnt4,
                clearCnt4:clearCnt4,
                examCnt4: examCnt4,
                decideCnt5: decideCnt5,
                deathCnt5: deathCnt5,
                clearCnt5: clearCnt5,
                examCnt5: examCnt5,
            })
        })
    })


    // rendering -> result 모든 데이터
    res.render("index", { ...result, day2 })
})

app.listen(port, () => {
    console.log(`Server Open! -> http://localhost:${port}`)
})
