import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}


class NewSeries extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect:false
        }
        this.saveSerie = this.saveSerie.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
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
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comment.value
        }
        api.saveSeries(newSerie).then((rest) => {
            this.setState({
                redirect:'/series/'+this.refs.genre.value
            })
        })
    }

    render() {
        return (
            <section className="intro-section">
            {this.state.redirect &&
                <Redirect to={this.state.redirect} />
            }
                <h1>Nova série</h1>
                <form>
                    Nome: <input ref='name' type="text" className="form-control" /><br />
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

export default NewSeries