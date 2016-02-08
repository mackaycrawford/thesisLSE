$(document).ready(function() {






  displayDocumentSentiment = function(resObj) {
    console.log("displayDocumentsentiment called")
    $("#example1").html("<h2>" + resObj[0] + "</h2>")
  }

  getDocumentSentiment = function(documentTextArray) {
    $.post("cgi-bin/ds.py", {
        documentText: documentTextArray
      })
      .done(function(data) {
        console.log(data)
        displayDocumentSentiment(data)
      });
  }
  
  $("#submitButton").click(function() {
    t = $("#documentText").val()
    s = getDocumentSentiment(t)
    //displayKeywordSentiment(s)
  })
})
