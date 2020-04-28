import React, { Component, Fragment } from 'react';
import './App.css';

export default class App extends Component {
	state = {
		images: [],
		userInput: {
			residence: '',
			conditionBeforeModified: '',
			modified: '',
			image: '',
			imageDescription: ''
		}
	};

	save = async () => {
		const image = this.state.userInput;
console.log(image)
		const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/images`, {
			method: image._id ? 'PUT' : 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(image)
		});

		const successful = response.status === 201 || response.status === 200;
    console.log(successful)
		if (successful) {
			await this.getImages();

			this.setState({
				userInput: {
					residence: '',
					conditionBeforeModified: '',
					modified: '',
					image: '',
					imageDescription: ''
				},
				error: null
			});
		} else {
			const error = await response.json();

			this.setState({ error });

			console.log(error);
		}
	};

	residenceChanged = (event) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				residence: event.target.value
			}
		});
	};

	conditionChanged = (event) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				conditionBeforeModified: event.target.value
			}
		});
	};

	modifiedChanged = (event) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				modified: event.target.value
			}
		});
	};

	imageChanged = (event) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				image: event.target.value
			}
		});
	};

	imageDescriptionChanged = (event) => {
		this.setState({
			userInput: {
				...this.state.userInput,
				imageDescription: event.target.value
			}
		});
	};

	editImage = (event) => {
		const imageId = event.target.attributes.getNamedItem('dataimageid').value;
		const image = this.state.images.reduce((imageToEdit, image) => {
			return image._id === imageId ? image : imageToEdit;
		}, null);

		if (image) {
			this.setState({ userInput: image });
		}
	};

	deleteImage = async (event) => {
		const imageId = event.target.attributes.getNamedItem('dataimageid').value;
    console.log(imageId)
		const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/images/${imageId}`, {
			method: 'DELETE',
			mode: 'cors'
		});
		const successful = response.status === 200;

		if (successful) {
			await this.getImages();
		}
	};
 

	renderError = () => {
		return this.state.error ? <div>{this.state.error.message}</div> : <Fragment />;
	};

	renderImages = () => {
		return this.state.images.map((image) => {
			return (
				<div key={image._id}>
					<button dataimageid={image._id} onClick={this.editImage}>
						{image.residence}
					</button>
					<button dataimageid={image._id} onClick={this.deleteImage}>
						(delete)
					</button>
				</div>
			);
		});
	};

	getImages = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/images`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				accept: 'application/json'
			}
		});

		const successful = response.status === 200;

		if (successful) {
      const images = successful ? await response.json() : [];
      console.log(images)
			this.setState({ images });
		} else {
			console.log(response);
		}
	};
	componentDidMount() {
		this.getImages();
	}

	render() {
		return (
			<div className="App">
				<nav>
					<a href="/">Manage</a>
					<a href="/">Preview</a>
				</nav>
				<div className="crud-area">
					<section>
						<h2>IMAGES</h2>
						<div>{this.renderImages()}</div>
					</section>
				</div>
				<main>
					<h2>New/Edit Image</h2>
					<div>
						<label htmlFor="residence-input">Residence:</label>
						<input
							id="residence-input"
							type="text"
							value={this.state.userInput.residence}
							onChange={this.residenceChanged}
						/>
					</div>

					<div>
						<label htmlFor="conditionBeforeModified-input">Condition Before Modified:</label>
						<input
							id="conditionBeforeModified-input"
							type="text"
							value={this.state.userInput.conditionBeforeModified}
							onChange={this.conditionChanged}
						/>
					</div>

					<div>
						<label htmlFor="modified-input">Modified:</label>
						<input
							id="modified-input"
							type="text"
							value={this.state.userInput.modified}
							onChange={this.modifiedChanged}
						/>
					</div>

					<div>
						<label htmlFor="image-url-input">Image URL:</label>
						<input
							id="image-url-input"
							type="text"
							value={this.state.userInput.imageUrl}
							onChange={this.imageChanged}
						/>
					</div>

					<div>
						<label htmlFor="imageDescription-input">Image Description:</label>
						<input
							id="imageDescription-input"
							type="text"
							value={this.state.userInput.imageDescription}
							onChange={this.imageDescriptionChanged}
						/>
					</div>

					<button onClick={this.save}>Save</button>
				</main>
			</div>
		);
	}
}
