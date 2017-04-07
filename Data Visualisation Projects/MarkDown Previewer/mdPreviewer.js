//const userText = "This is the test value. Changes made"
//let mdOutput = "This is the placeholder for the markdown output"

let initialValue = 'Heading\n==\nSub Heading\n--\n5 Little monkeys *jumping* on the bed. \n__one fell off__ and bumped his head\n\n~~Father~~ Mother called the doctor and the doctor said\n\nNo more monkeys jumping on the bed.\n[Watch view on Youtube](https://www.youtube.com/watch?v=0uenvW3DrMI "Youtube video of the song")'

/*marked.setOptions({
  gfm: true,
  breaks: true,

}) */

class UserInput extends React.Component {
  constructor (props){
   super(props)
   this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput(event){
    this.props.updateUserInput(event.target.value)
  }

  render() {
    return (
      <div className="userInput">
        <h3 className="title">Markdown</h3>
        <textarea
          type="text" defaultValue={this.props.value}
          value={this.props.userInput}
          onChange={this.handleUserInput}>
        </textarea>
      </div>
    )
  }
}

function MarkdownView(props) {

  console.log(props.value)
  return (
    <div className="mdView">
      <h3 className="title">Text Output</h3>
      <div className="content" dangerouslySetInnerHTML={{__html: props.value}} />
    </div>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInput: initialValue,
      mdOutput: marked(initialValue)
    }
    this.updateUserInput = this.updateUserInput.bind(this)
  }

  updateUserInput(newUserInput){
    let html = marked(newUserInput)
    console.log(html)
    this.setState({
      userInput: newUserInput,
      mdOutput: html
    })
  }

  render() {
    return (
      <main className="container">
        <UserInput
          updateUserInput={this.updateUserInput}
          userInput={this.state.userInput}
        />
        <MarkdownView
          value={this.state.mdOutput}
        />
      </main>
  )}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
