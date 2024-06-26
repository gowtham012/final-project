App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  rendering: false,
  lastRenderTime: 0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      instance.votedEvent({}, {
        fromBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event);
        if (!App.lastRenderTime || (Date.now() - App.lastRenderTime > 3000)) {
          App.render();
          App.lastRenderTime = Date.now();
        }
      });
    });
  },

  render: function() {
    if (App.rendering) return;
    App.rendering = true;

    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
          candidatesResults.append(candidateTemplate);

          var candidateOption = "<option value='" + id + "' >" + name + "</option>";
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      if (hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
      App.rendering = false;
    }).catch(function(error) {
      console.warn(error);
      App.rendering = false;
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      $("#content").hide();
      $("#loader").show();
      setTimeout(updateAttemptsAndRedirect, 7000);
    }).catch(function(err) {
      console.error(err);
    });
  },
  

displayWinner: function() {
  var electionInstance;
  App.contracts.Election.deployed().then(function(instance) {
    electionInstance = instance;
    return electionInstance.candidatesCount();
  }).then(function(candidatesCount) {
    var maxVotes = 0;
    var winnerName = "";
    var winnerId = 0;

    var promises = [];

    for (let i = 1; i <= candidatesCount; i++) {
      promises.push(electionInstance.candidates(i));
    }

    Promise.all(promises).then(function(candidates) {
      candidates.forEach(function(candidate) {
        var voteCount = candidate[2].toNumber();
        if (voteCount > maxVotes) {
          maxVotes = voteCount;
          winnerName = candidate[1];
          winnerId = candidate[0].toNumber();
        }
      });

      if (winnerId !== 0) {
        $("#winner").html( winnerName );
      } else {
        $("#winner").html("No votes have been cast.");
      }
    });
  }).catch(function(err) {
    console.error(err);
  });
}



};

  

$(function() {
  $(window).load(function() {
    App.init();
  });
});
