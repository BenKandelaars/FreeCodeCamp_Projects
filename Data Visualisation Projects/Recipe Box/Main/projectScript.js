
let recipeStore = [
    {
      "id": 1,
      "name": "Lasagne",
      "book": "Delia p.25",
      "ingredients": [
        "Pasta sheets", "Pasta Sauce", "Parmesan Cheese"]
    },
    {
      "id": 2,
      "name": "Lasagne",
      "book": "Delia p.25",
      "ingredients": [
        "Pasta sheets", "Parmesan Cheese"]
    },
    {
      "id": 3,
      "name": "Lasagne",
      "book": "Delia p.25",
      "ingredients": [
        "Pasta sheets", "Pasta Sauce", "Parmesan Cheese", "Parmesan Cheese"]
    }
]

function IngredientList ({ingredients}){

  const ingredientItems = ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)

  return (
    <article className="recipe_ingredientList">
      <h6>Ingrediants:</h6>
      <ul>
        {ingredientItems}
      </ul>
    </article>
  )
}

function RecipeBook ({book}){
  const styleComponent = {margin: '10px auto'}
  const styleHeader = {display: 'inline', fontWeight: 'normal'}
  const styleBook = {display: 'inline'}

  return (
    <article style={styleComponent}>
      <h6 style={styleHeader}>Recipe Book: </h6>
        <p style={styleBook}>{book}</p>
    </article>
  )
}

function RecipeTray (props){
  return (
    <article className="recipe_tray">
      <button className="recipe_btn btn_primary">Update</button>
      <button className="recipe_btn btn_alert">Delete</button>
    </article>)
}

function RecipeName ({name}){
  return (
    <div className="recipe_label">
      <p>{name}</p>
    </div>
  )
}

class RecipeBox extends React.Component {
  constructor (props){
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.openOnClick()
  }

  render(){
    const style = {
      width: `300px`,
      height: this.props.isOpen ? this.props.height : '2.5rem',
      margin: `5px 10px 0px 10px`,
      overflow: 'hidden',

      border: `1px solid cornflowerblue`,
      borderRadius: '5px 5px 5px 5px',
      backgroundImage: 'linear-gradient(to bottom, cornflowerblue 2.5rem, transparent 2.5rem)',

      transition: `height 0.2s ease-out`,
    }

    const {name, book, ingredients} = this.props.recipe

    return (
      <div style={style} onClick={this.handleClick}>
        <section>
          <RecipeName name={name} />
          <article className="recipe_detail">
            <RecipeBook book={book} />
            <IngredientList ingredients = {ingredients} />
            <RecipeTray />
          </article>
        </section>
      </div>)
  }
}


class RecipeBoxContainer extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      isOpen: true,
      height: 'auto'
    }

    this.openOnClick = this.openOnClick.bind(this)
  }

  componentDidMount(){
    this.setState({
      height: window.getComputedStyle(ReactDOM.findDOMNode(this.instance)).getPropertyValue("height"),
      isOpen: false
    })
  }

  openOnClick (){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        <RecipeBox
          ref = {(instance) => this.instance = instance}

          isOpen = {this.state.isOpen}
          height = {this.state.height}
          openOnClick = {this.openOnClick}

          recipe = {this.props.recipe}
          />
      </div>
    )
  }
}

class RecipeIndex extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      currentOpen: ""
    }
  }

  render(){
    const recipeItems = recipeStore.map((recipe, index) =>
      <RecipeBoxContainer
        key = {recipe.id}
        recipe = {recipe}/>
    )

    return (
      <div>
        {recipeItems}
      </div>
    )
  }
}


class App extends React.Component {
  constructor (props){
    super(props)
  }

  render(){
    return (
      <div>
        <RecipeIndex />
      </div>
  )}
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
