

class Hello extends React.Component {
  constructor (props){
    super(props)
  }

  render(){
    return (
      <div>
        <p>Hello World</p>
      </div>
  )}
}

function App(props){
  return <Hello />
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
