let recipeDetail = document.getElementById('recipe_detail')

let height = Math.ceil(recipeDetail.getBoundingClientRect().height)
let height2 = window.getComputedStyle(recipeDetail)

console.log(height)
console.log(height2.getPropertyValue("height"))
