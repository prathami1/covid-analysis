from flask import Flask
from bs4 import BeautifulSoup
import requests
# New imports
from bokeh.plotting import figure, output_file, show
from bokeh.embed import json_item
import json

app = Flask(__name__)

@app.route('/')
def blank():
    #Directions for REST API
    return {"directions":"view the corresponding API requests by navigating to the correct route in the URL. The routes are /data, /time, /news, /vac, and /float. /plot1 is an experimental plot, and is still in production."}

@app.route('/data')
def index():
    response = requests.get('https://data.gov/[API]')
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
        note = data['result']['results'][i]['notes'][0:300]
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
    response = requests.get('https://covidtracking.com/[API]')
    data = response.json()

    response2 = requests.get('https://covid19.mathdro.id/[API]')
    data2 = response2.json()

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
    confirmeds = []
    recovereds = []
    death2s = []
    lastUp2s = []

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

    confirmed = data2['confirmed']['value']
    recovered = data2['recovered']['value']
    death2 = data2['deaths']['value']
    lastUp2 = data2['lastUpdate'][0:10]
    confirmeds.append(confirmed)
    recovereds.append(recovered)
    death2s.append(death2)
    lastUp2s.append(lastUp2)

    results = {"date":dates, "states":states, "positive":positives, "negative":negatives, "pending":pendings, "hospitalizedCurrently":hospitalizedCurrentlys, "hospitalized":hospitalizeds, "inIcuCumulative":inIcuCumulatives, "inIcuCurrently":inIcuCurrentlys, "onVentilatorCurrently":onVentilatorCurrentlys, "onVentilatorCumulative":onVentilatorCumulatives, "dateChecked":dateCheckeds, "death":deaths, "totalTestResults":totalTestResults, "deathIncrease":deathIncreases, "hospitalizedIncrease":hospitalizedIncreases, "negativeIncrease":negativeIncreases, "positiveIncrease":positiveIncreases, "totalTestResultsIncrease":totalTestResultsIncreases, "death2":death2s, "confirmed":confirmeds, "recovered":recovereds, "refresh":lastUp2s}

    return results

@app.route('/news')
def news():
    response = requests.get('http://newsapi.org/[API]')
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
    response = requests.get('https://cdc.gov/[API]')
    data = response.json()

    states = []
    #regions = []
    #firstDoses = []
    totalFirsts = []
    totalSeconds = []
    weeks = []

    for i in range(0, 55):
        state = data[i]['jurisdiction']
        #region = data[i]['hhs_region']
        week = data[i]['week_of_allocations'][0:10]
        #firstDose = data[i]['first_doses_12_14']
        totalFirst = data[i]['_1st_dose_allocations']
        totalSecond = data[i]['_2nd_dose_allocations']
        states.append(state)
        #regions.append(region)
        #firstDoses.append(firstDose)
        totalFirsts.append(totalFirst)
        totalSeconds.append(totalSecond)
        weeks.append(week)

    results = {"state":states, "week":weeks, "totalFirst":totalFirsts, "totalSecond":totalSeconds}

    return results

@app.route('/float')
def float():
    page = requests.get('https://www.worldometers.info/[path-to-covid-stats]')
    soup = BeautifulSoup(page.content, 'html.parser')
    statistics = soup.findAll("div", {"id":"maincounter-wrap"})
    refresh = soup.find('div', {"style":"font-size:13px; color:#999; margin-top:5px; text-align:center"})

    for i in statistics:
        numbers = soup.findAll('div', {'class':'maincounter-number'})
        cases = numbers[0].text[1:12]
        deaths = numbers[1].text[1:10]
        recovered = numbers[2].text[1:12]

    results = {"cases":cases, "deaths":deaths, "recovered":recovered, "refresh":refresh.text}

    return results

#@app.route('/table')
#def table():
    #response = requests.get('https://www.worldometers.info/[path-to-covid-stats]')
    #soup = bs.BeautifulSoup(response.text)
    #table = soup.find("table", {"class":"table table-bordered table-hover main_table_countries dataTable no-footer"})


@app.route('/plot1')
def plot1():
    # prepare some data
    x = [1, 2, 3, 4, 5]
    y = [6, 7, 2, 4, 5]

    # create a new plot with a title and axis labels
    p = figure(title="simple line example", x_axis_label='x', y_axis_label='y')

    # add a line renderer with legend and line thickness
    p.line(x, y, legend_label="Temp.", line_width=2)

    return json.dumps(json_item(p, "myplot"))
