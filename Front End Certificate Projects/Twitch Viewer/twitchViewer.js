function jsonpCall(url, callback){
  const script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function setUrl(channel, callback){
  let url = "https://wind-bow.gomix.me/twitch-api/streams/"
  url += channel
  url += "?callback=" + String(callback);
  return url
}

function display(data){
  console.log(data)
  if (data.stream === null){

    console.log("not on line")

  } else {

    console.log("online & playing ", data.stream.game)

    let channelURL = data.stream.channel.url
    let logo = data.stream.channel.logo
    let game = data.stream.game
  }
}

let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

jsonpCall(setUrl(channels[0], "display"))
