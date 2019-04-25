import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}


class EditSeries extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: []
        }
        this.saveSerie = this.saveSerie.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadSeriesById(this.props.match.params.id)
        .then((res) =>{ 
            this.setState({ series: res.data })
            this.refs.name.value = this.state.series.name
            this.refs.genre.value = this.state.series.genre
            this.refs.comment.value =  this.state.series.comments
            this.refs.status.value = this.state.series.status 
        })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    saveSerie() {
        const newSerie = {
            id:this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comment.value
        }
        api.updateSeries(newSerie).then((rest) => {
            this.setState({
                redirect: '/series/' + this.refs.genre.value
            })
        })
    }

    render() {
        return (
            <section className="intro-section">
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Editar série</h1>
                
                <form>
                    Nome: <input ref='name' defaultValue = {this.state.series.name} type="text" className="form-control" /><br />
                    Status:
                    <select ref='status'>
                        {Object.keys(statuses).map(key => <option key={key} value={key}>{statuses[key]}</option>)}
                    </select><br /> <br />
                    Genero:
                    <select ref='genre'>
                        {this.state.genres.map(key => <option key={key} value={key}>{key}</option>)}
                    </select><br /> <br />
                    Comentários: <textarea ref='comment' className="form-control"></textarea><br />
                    <button type="button" onClick={this.saveSerie}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries