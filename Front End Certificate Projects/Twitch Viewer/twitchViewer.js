/*
function displayData(data){

  console.log(data)
  if (data.stream === null){

    return "Channel not on line"

  } else {

    console.log("online & playing ", data.stream.game)

    let channelURL = data.stream.channel.url
    let logo = data.stream.channel.logo
    let game = data.stream.game
  }
}

*/
let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]

const $displayList = $(".listContainer")
let $listItem = $("<li class=\"streamer\"></li>")

function listUser(channel){

  let $listItem = $("<li class=\"streamer\"></li>")
  $listItem.attr("data", channel)
  $listItem.append("<div class=\"logo\"></div>")

  let $streamerText = $("<div class=\"streamer_info_container\"></div>")
  $streamerText.append("<a href=\"#\"> <h3>" + channel + "</h3> </a>")
  $streamerText.append("<div><p class=\"streamer_info\">Streamer off line</p></div>")

  $listItem.append($streamerText)

  $displayList.append($listItem)

}


function updateUserRegistered(data){

  console.log(data.response)

/*
  let $item = $displayList.find("[data='" + data.channel + "']")
  let $streamerInfo = $item.find("p")

  let online = !!data.response.stream

  // User isn't currently streaming
  if (!online){
    if ($item.hasClass("online")){$item.removeClass("online")}
    $streamerInfo.text("Off line")
  } else {

  // User is streaming content
  $streamerInfo.text(data.response.stream.game)

  if (!$item.hasClass("online")){
    $item.addClass("online")
  }

  //Update link href
  let $link = $item.find("a")
  $link.attr("href", data.response.stream.channel.url)
  $link.attr("target", "_blank")
  }

  */
}

function updateUserStreaming(data){

  console.log(data.response)

  let $item = $displayList.find("[data='" + data.channel + "']")
  let $streamerInfo = $item.find("p")

  let online = !!data.response.stream

  // User isn't currently streaming
  if (!online){
    if ($item.hasClass("online")){$item.removeClass("online")}
    $streamerInfo.text("Off line")
  } else {

  // User is streaming content
  $streamerInfo.text(data.response.stream.game)

  if (!$item.hasClass("online")){
    $item.addClass("online")
  }

  //Update link href
  let $link = $item.find("a")
  $link.attr("href", data.response.stream.channel.url)
  $link.attr("target", "_blank")
  }
}

let twitchAPICall = (function (window){

  return function twitchAPICall(apifocus){

    return function (channel){

      let url = "https://wind-bow.gomix.me/twitch-api/"
      url += apifocus + "/"
      url += channel
      url += "?callback=" + String(channel);

      const script = document.createElement("script");
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);

      return new Promise ((resolve, reject) => {

        window[channel] = function (response){

          script.remove()
          delete window[channel]

          resolve({
            channel: channel,
            response: response
          })
        }
      })
    }
  }
})(window)

let checkChannel = twitchAPICall("streams")
let checkUser = twitchAPICall("users")

function initList (channels){

  channels.map(function(channel){
    listUser(channel)
    return channel
  })

  channels.map(function (channel){

    checkUser(channel)
    .then((data) => {
      return updateUserRegistered(data)
    })
  })

/*
  channels.map(function (channel){

    checkChannel(channel)
    .then((data) => {
      return updateUserStreaming(data)
    })
  })

*/
}

initList(channels)
