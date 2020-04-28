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
    
    const response = await fetch (`${process.env.REACT_APP_API_BASE_URL}/image`,{
      method: image._id ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
          'content type': 'application/json',
         
      },
      body: JSON.stringify(image)
  
  }
)

const successful = response.status === 201 || response.status === 200

if (successful) {
  await this getImages()
  
  this.setState({
    userInput: {
      residence: '',
      conditionBeforeModified: '',
      modified: '',
      image: '',
      imageDescription: ''
    },
    error: null
  })
}
else {
  const error = await response.json()

  this.setState({ error })

  console.log(error)
}
}
//residence: '',
      //conditionBeforeModified: '',
      //modified: '',
      //image: '',
      //imageDescription: ''

residenceChanged = (event) =>{
  this.setState({
    userInput: {  ... this.state.userInput,
      residence: event.target.value
    }
  })
}

conditionChanged = (event) =>{
  this.setState({
    userInput: {  ... this.state.userInput,
      conditionBeforeModified: event.target.value
    }
  })
}

modifiedChanged = (event) =>{
  this.setState({
    userInput: {  ... this.state.userInput,
      modified: event.target.value
    }
  })
}

imageChanged = (event) =>{
  this.setState({
    userInput: {  ... this.state.userInput,
      image: event.target.value
    }
  })
}

imageDescriptionChanged = (event) =>{
  this.setState({
    userInput: {  ... this.state.userInput,
      image: event.target.value
    }
  })
}

editImage = (event) => {
  const imageId = event.target.attributes.getNamedItem('tvshowid').value
  const tvShow = this.state.images.reduce ((imageToEdit,image) => {
    return image._id === imageId ? image : imageToEdit
  },null)

  if (image) {
    this.setState({userInput: image} 
    )
  }
}





