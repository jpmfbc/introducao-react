import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/"
})

export const saveSeries = (newSeries) => api.post('series',newSeries)
export const loadSeriesByGenre = (genre) =>api.get('series?genre='+genre)
const apis = {
    loadGenres: () => api.get('genres'),
    saveSeries:saveSeries,
    loadSeriesByGenre:loadSeriesByGenre
}

export default apis