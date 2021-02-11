from flask import Flask
import requests

app = Flask(__name__)

@app.route('/data')
def index():
    response = requests.get('https://catalog.data.gov/api/3/action/package_search?q=covid&rows=25')
    data = response.json()

    titles = []
    notes = []
    dates = []
    maints = []
    headings = []
    org_imgs = []
    urls = []

    for i in range(0,25):
        title = data['result']['results'][i]['title']
        note = data['result']['results'][i]['notes']
        date = data['result']['results'][i]['organization']['created'][0:10]
        heading = data['result']['results'][i]['organization']['title']
        org_img = data['result']['results'][i]['organization']['image_url']
        maintain = data['result']['results'][i]['maintainer']
        url = data['result']['results'][i]['resources'][0]['url']
        titles.append(title)
        notes.append(note)
        dates.append(date)
        headings.append(heading)
        org_imgs.append(org_img)
        maints.append(maintain)
        urls.append(url)

    results = {"title":titles, "note":notes, "date":dates, "heading":headings, "org_img":org_imgs, "author":maints, "href":urls} 

    return results

@app.route('/time')
def time():
    response = requests.get('https://api.covidtracking.com/v1/us/daily.json')
    data = response.json()

    dates = []
    states = []
    positives = []
    negatives = []
    pendings = []
    hospitalizedCurrentlys = []
    hospitalizeds = []
    inIcuCurrentlys = []
    inIcuCumulatives = []
    onVentilatorCurrentlys = []
    onVentilatorCumulatives = []
    dateCheckeds = []
    deaths = []
    totalTestResults = []
    deathIncreases = []
    hospitalizedIncreases = []
    negativeIncreases = []
    positiveIncreases = []
    totalTestResultsIncreases = []
    
    for i in range(0, 100):
        date = data[i]['date']
        state = data[i]['states']
        positive = data[i]['positive']
        negative = data[i]['negative']
        pending = data[i]['pending']
        hospitalizedCurrently = data[i]['hospitalizedCurrently']
        hospitalized = data[i]['hospitalized']
        inIcuCumulative = data[i]['inIcuCumulative']
        inIcuCurrently = data[i]['inIcuCurrently']
        onVentilatorCurrently = data[i]['onVentilatorCurrently']
        onVentilatorCumulative = data[i]['onVentilatorCumulative']
        dateChecked = data[i]['dateChecked'][0:10]
        death = data[i]['death']
        totalTestResult = data[i]['totalTestResults']
        deathIncrease = data[i]['deathIncrease']
        hospitalizedIncrease = data[i]['hospitalizedIncrease']
        negativeIncrease = data[i]['negativeIncrease']
        positiveIncrease = data[i]['positiveIncrease']
        totalTestResultsIncrease = data[i]['totalTestResultsIncrease']
        dates.append(date)
        states.append(state)
        positives.append(positive)
        negatives.append(negative)
        pendings.append(pending)
        hospitalizedCurrentlys.append(hospitalizedCurrently)
        hospitalizeds.append(hospitalized)
        inIcuCumulatives.append(inIcuCumulative)
        inIcuCurrentlys.append(inIcuCurrently)
        onVentilatorCurrentlys.append(onVentilatorCurrently)
        onVentilatorCumulatives.append(onVentilatorCumulative)
        dateCheckeds.append(dateChecked)
        deaths.append(death)
        totalTestResults.append(totalTestResult)
        deathIncreases.append(deathIncrease)
        hospitalizedIncreases.append(hospitalizedIncrease)
        negativeIncreases.append(negativeIncrease)
        positiveIncreases.append(positiveIncrease)
        totalTestResultsIncreases.append(totalTestResultsIncrease)

    results = {"date":dates, "states":states, "positive":positives, "negative":negatives, "pending":pendings, "hospitalizedCurrently":hospitalizedCurrentlys, "hospitalized":hospitalizeds, "inIcuCumulative":inIcuCumulatives, "inIcuCurrently":inIcuCurrentlys, "onVentilatorCurrently":onVentilatorCurrentlys, "onVentilatorCumulative":onVentilatorCumulatives, "dateChecked":dateCheckeds, "death":deaths, "totalTestResults":totalTestResults, "deathIncrease":deathIncreases, "hospitalizedIncrease":hospitalizedIncreases, "negativeIncrease":negativeIncreases, "positiveIncrease":positiveIncreases, "totalTestResultsIncrease":totalTestResultsIncreases}

    return results

@app.route('/news')
def news():
    response = requests.get('http://newsapi.org/v2/everything?q=covid&pageSize=25&apiKey=d5cdc5700c274b90b91e90eec8d966e3')
    data = response.json()

    websites = []
    authors = []
    titles = []
    notes = []
    urls = []
    img_urls = []
    dates = []


    for i in range(0,25):
        website = data['articles'][i]['source']['name']
        author = data['articles'][i]['author']
        title = data['articles'][i]['title']
        note = data['articles'][i]['description']
        url = data['articles'][i]['url']
        img_url = data['articles'][i]['urlToImage']
        date = data['articles'][i]['publishedAt'][0:10]
        websites.append(website)
        authors.append(author)
        titles.append(title)
        notes.append(note)
        urls.append(url)
        img_urls.append(img_url)
        dates.append(date)

    results = {"website":websites, "author":authors, "title":titles, "notes":notes, "url":urls, "img_url":img_urls, "date":dates}

    return results

@app.route('/vac')
def vac():
    response = requests.get('https://data.cdc.gov/resource/saz5-9hgg.json')
    data = response.json()

    states = []
    regions = []
    firstDoses = []
    totalFirsts = []
    totalSeconds = []

    for i in range(0, 55):
        state = data[i]['jurisdiction']
        region = data[i]['hhs_region']
        firstDose = data[i]['first_doses_12_14']
        totalFirst = data[i]['total_pfizer_allocation_first_dose_shipments']
        totalSecond = data[i]['total_allocation_pfizer_second_dose_shipments']
        states.append(state)
        regions.append(region)
        firstDoses.append(firstDose)
        totalFirsts.append(totalFirst)
        totalSeconds.append(totalSecond)
    
    results = {"state":states, "region":regions, "firstDose":firstDoses, "totalFirst":totalFirsts, "totalSecond":totalSeconds}

    return results