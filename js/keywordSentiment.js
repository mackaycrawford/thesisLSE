$(document).ready(function() {
  splitAndFilter = function(keyword, text) {
    outArr = []
    a = text.match(/[^\.!\?]+[\.!\?]+/g);
    for (var i = 0; i < a.length; i++) {
      isMatch = a[i].search(keyword)
      if (isMatch > 0) {
        x = a[i].trim()
        x = x.replace(/  /g, " ")
        x = x.replace(/\r/g, " ")
        x = x.replace(/\n/g, " ")
        outArr.push(x)
      }
    }
    return outArr
  }

  renderGrid = function(gridData) {
    $container = $("#example1");
    $container.handsontable({
      data: gridData,
      rowHeaders: false,
      colHeaders: ["Sentence", "Sentiment"],
      contextMenu: false,
      minSpareRows: 0,
      minSpareCols: 0,
      startRows: 0,
      startCols: 0,
      readOnly: true,
      stretchH: "all",
      colWidths: [100, 50]
    });
    // This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
    var hotInstance = $("#example1").handsontable('getInstance');
    $container.handsontable("getData")
  }


  renderGrid([
    [
      [],
      []
    ],
    [
      [],
      []
    ]
  ])

  displayKeywordSentiment = function(resObj) {
    console.log("displayKeywordsentiment called")
    console.log(resObj)
    arr = _(resObj).sortBy('1')
    arr.reverse()
    renderGrid(arr)
  }

  getKeywordSentiment = function(documentTextArray) {
    $.post("cgi-bin/kws.py", {
        documentText: documentTextArray.join("|||")
      })
      .done(function(data) {
        displayKeywordSentiment(data)
      });
  }
  
  $("#submitButton").click(function() {
    k = $("#keywordInput").val()
    t = $("#documentText").val()
    z = splitAndFilter(k, t)
    s = getKeywordSentiment(z)
    displayKeywordSentiment(s)
  })
})
