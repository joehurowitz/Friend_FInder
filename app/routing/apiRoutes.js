// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information o
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey... this data is then sent to the server...
  // Then the server saves the data to the array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    var newUser = req.body;
    var result = findBestMatch(newUser, friendsData)
    friendsData.push(newUser);
    res.json(result);
  });

  // API HELPER METHODS
  // ---------------------------------------------------------------------------

  // Calculate differences (inbound user, comparison user from ALL users)
  function findBestMatch(newUser, collectionOfUsers){
    var differences = [];

    for (var i = 0; i < collectionOfUsers.length; i++){
      var comparisonUser = collectionOfUsers[i]
      var individualDifference = 0;

      for (var s=0; s < comparisonUser.scores.length; s++){
         individualDifference += Math.abs(newUser.scores[s] - comparisonUser.scores[s]);
      }
      differences.push(individualDifference);
    }

    // Iterate through differences and locate lowest value
    // Identify the index of the least value
    // return the data of user in collectionOfUsers at the index
    var indexOfLowest = 0;
    var lowestDifference = 51;
    
    for (var d=0; d < differences.length; d++) {
      if (differences[d] < lowestDifference) {
        lowestDifference = differences[d];
        indexOfLowest = d;
      }
    }

    return collectionOfUsers[indexOfLowest];
  }


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
   

    console.log(friendsData);
  });
};