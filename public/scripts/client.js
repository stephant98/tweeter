/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  let periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  };

  const formatTime = function (timeCreated) {
    let diff = Date.now() - timeCreated;
  
    if (diff > periods.month) {
      return Math.floor(diff / periods.month) + "m ago";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + "w ago";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + "d ago";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + "h ago";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + "m ago";
    }
    return "Just now";
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const tweetBody = `<article>
      <header class="tweet-header">
        <p class="emoji-name"><img src="${tweetObj.user.avatars}">${tweetObj.user.name}</p> <h4 class="faded-username">${tweetObj.user.handle}</h4>
      </header>
        <p class="tweet-text">${escape(tweetObj.content.text)}</p>
      <footer>
        <p>${formatTime(tweetObj.created_at)}</p> <p class="actions">&#9873 &#8646 &#10084</p>
      </footer>
    </article>`;
  
    return tweetBody;
  };


  const renderTweets = function(arrOfTweetObj) {

    for (let tweetObj of arrOfTweetObj) {
      const newTweetElement = createTweetElement(tweetObj);
      $('#tweet-container').prepend(newTweetElement);
    }
  };

  
  
  $('#post-form').on('submit', function(event) {

    event.preventDefault();

    const postArea = $(this).children('#tweet-text');
    const userInput = postArea.serialize();
    
    if (postArea.val().length < 140 && postArea.val().length > 0) {
      
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: userInput
      })
        .done(() => {
          $(".tweet-valid").slideUp();
          postArea.val('');
          loadTweets();
        })
        .fail(() => console.log('error'));
    } else {
      $(".tweet-valid").slideDown();
    }
  });

  const loadTweets = function(jsonTweets) {
  
    $.ajax({
      url: '/tweets/',
      method: 'GET',
    })
      .then((result) => renderTweets(result))
      .fail(() => console.log('an eerror ocurred'));
  };
  loadTweets();

});


