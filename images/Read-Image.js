state = {
    Images: [],
    userInput: {
      residence: '',
      conditionBeforeModified: '',
      modified: '',
      image: '',
      imageDescription: ''
    }
  }


getImage=async ()=> {
    const image = this.state.userInput
}
const response = await fetch (`${process.env.REACT_APP_API_BASE_URL}/image`{
    method: 'GET',
    mode: 'cors',
    headers: {
        'content type': 'application/json',
        body: JSON.stringify(image)
    }
})
