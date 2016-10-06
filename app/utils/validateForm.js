let errorsObj = {
  name: [],
  creator: [],
  description: []
}
let conditions = {
  name: [
    {"Please Enter a Minimum of 2 Letters" => (this.state.art.name.length < 2)}
  ],
  creator: [
    {"Please Enter a Minimum of 2 Letters" => (this.state.art.creator.length < 2)}
  ],
  description: [
    {"Please Enter a Minimum of 10 Letters" => (this.state.art.description.length < 2)}
  ]
}
validateForm(errorsObj, conditions);

const validateForm = (errors_object, conditions) => {
  for (let condition in conditions) {
    const name = condition.key
    condition[name].forEach((boo) => {
      if (boo) {
        return errorsObj = {
          ...errorsObj,
          name => boo.key
        }
      }
    })
  }
  return errorsObj
}
this.setState({
  ...this.state,
  art: {
    ...this.state.art,
    errors: errors
  }
})
const errorCount = Object.values(errors);
return !errorCount.some((error) => { return error.length > 0})

export default validateForm