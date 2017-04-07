// add section for checking the channel object to get the link

let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
"habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]

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
          delete window[channel];

          resolve({
            channel: channel,
            response: response
          })
        }
      })
    }
  }
})(window)

let checkChannel = twitchAPICall("channels")
let checkStreaming = twitchAPICall("streams")


function updateUserRegistered(data){

  let $item = $displayList.find("[data='" + data.channel + "']")

  // User not known or closed account
  if (data.response.error) {

    let $streamerInfo = $item.find("p")

    $streamerInfo.text(data.response.message)
    $item.addClass("inactive")

    return false

  } else {

    // User known

    let $logo = $item.find(".logo")
    let logoSource = data.response.logo

    $logo.html("<img src=\"" + logoSource + "\">")

    let $link = $item.find("a")
    $link.attr("href", data.response.url)
    $link.attr("target", "_blank")

    return {
      channel: data.channel
    }
  }
}


function updateUserStreaming(data){

  console.log(data)
  let $item = $displayList.find("[data='" + data.channel + "']")

  let $streamerInfo = $item.find("p")

  let online = !!data.response.stream

  // User isn't currently streaming
  if (!online){
    if ($item.hasClass("online")){$item.removeClass("online")}
    $streamerInfo.text("Off line")

  } else {

  // User is streaming content
  $streamerInfo.text(data.response.stream.channel.status)

  if (!$item.hasClass("online")){
    $item.addClass("online")
  }

  //Update link href
  let $link = $item.find("a")
  $link.attr("href", data.response.stream.channel.url)
  $link.attr("target", "_blank")
  }
}

function updateChannelLink(){
  //Update link href
  let $link = $item.find("a")
  $link.attr("href", data.response.stream.channel.url)
  $link.attr("target", "_blank")
}

function initList (channels){

  channels.map(function(channel){
    listUser(channel)
    return channel
  })

  channels.map(function (channel){

    checkChannel(channel)
    .then((data) => {
      return updateUserRegistered(data);
    })
    .then((registered) => {
      return !registered ? null : checkStreaming(registered.channel)
    })
    .then((data) => {
      return !data ? null : updateUserStreaming(data)
    })
  })
}

initList(channels)
