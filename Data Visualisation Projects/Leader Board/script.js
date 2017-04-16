


function Header(props){
  return (
    <header>
      <h1>freeCodeCamp</h1>
      <h4>React.js Leader board Project by Ben Kandelaars</h4>
    </header>
  )
}

function TableRow(props) {
  return (
    <tr>
      <td>{props.hash + 1}</td>
      <td>
        <div className="camper">
          <img src={props.camper.img} />
          {props.camper.username}
        </div>
      </td>
      <td>{props.camper.recent}</td>
      <td>{props.camper.alltime}</td>
    </tr>
  )
}

function ListItems (props){
  let rows = []

  console.log(props)

  for (let i = 0; i < props.rows; i++){
    rows.push(<TableRow key={i} hash={i} camper={props.campers[i]} />)
  }

  return <tbody>{rows}</tbody>
}


function TableHeader (props){
  return (
    <th>
      <a href="#" data-type={props.value} onClick={props.userSelect}>
        {props.value}
        {"\u00A0"}
        {props.sort == props.value ? "\u25BC" : "" }
      </a>
    </th>
  )
}

let campers = [{
  username: "Tester Jonsie",
  recent: "100",
  alltime: "1345",
  img: ""
}]



class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sort: "Last 30 Days",
      campers: campers
    }

    this.handleUserSelection = this.handleUserSelection.bind(this)
  }

  componentDidMount(){
    requestLists().then(() => this.updateTable())
  }

  updateTable(){
    this.setState({
      campers: list30Days
    })
  }

  handleUserSelection(event){

    let campers = event.target.dataset.type == "Last 30 Days" ? list30Days : listTotalPoints

    this.setState({
      sort: event.target.dataset.type,
      campers: campers
    })

  }

  render(){
    return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Camper</th>
          <TableHeader value="Last 30 Days" sort={this.state.sort} userSelect={this.handleUserSelection} />
          <TableHeader value="Total Points" sort={this.state.sort} userSelect={this.handleUserSelection}/>
        </tr>
      </thead>
      <ListItems rows={this.state.campers.length} campers={this.state.campers} />
    </table>
    )
  }
}

function App(props){
  return (
    <div>
      <Header />
      <Table />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)

let list30Days = []
let listTotalPoints = []

function requestLists (){

  let url30Days = "https:\/\/fcctop100.herokuapp.com\/api\/fccusers\/top\/recent"
  let urlTop100 = "https:\/\/fcctop100.herokuapp.com\/api\/fccusers\/top\/alltime"

  function makeRequest(url){

    return new Promise (function(resolve, reject){

      let httpRequest = new XMLHttpRequest()

      httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 & this.status == 200){
          //console.log(httpRequest.responseText)
          resolve(httpRequest.responseText)
        }
      }

      httpRequest.open('GET', url, true)
      httpRequest.send()

    })
  }

  makeRequest(urlTop100).then((data)=> {
    listTotalPoints = JSON.parse(data)
  })

  return makeRequest(url30Days).then((data)=> {
    list30Days = JSON.parse(data)

  })
}
