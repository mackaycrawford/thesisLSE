$(document).ready(function() {
  renderGrid = function(gridData) {
    $container = $("#example1");
    $container.handsontable({
      data: gridData,
      rowHeaders: false,
      colHeaders: ["Word", "Count"],
      contextMenu: false,
      minSpareRows: 0,
      minSpareCols: 0,
      startRows: 0,
      startCols: 0,
      readOnly: true,
      stretchH: "all"
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

  displayWordCount = function(resObj) {
    $("#test").html(resObj)
    console.log(resObj)
    console.log(typeof(resObj))
    arr = _.pairs(resObj)
    finalArr = []
    $(arr).each(function(x, y) {
      miniObj = {}
      miniObj['word'] = x[0]
      miniObj['count'] = x[1]
      finalArr.push(miniObj)
    })
    arr = _(arr).sortBy('1')
    arr.reverse()
    console.log(arr)
    renderGrid(arr)
    return arr
  }

  getWordCount = function(documentText) {
    $.post("cgi-bin/wc.py", {
        documentText: documentText
      })
      .done(function(data) {
        displayWordCount(data)
      });
  }

  $("#submitButton").click(function() {
    t = $("#documentText").val()
    res = getWordCount(t)
    displayWordCount(res)
  })
})
