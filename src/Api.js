import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/"
})

export const saveSeries = (newSeries) => api.post('series',newSeries)
export const updateSeries = (series) => api.put('series/'+series.id,series)
export const loadSeriesByGenre = (genre) =>api.get('series?genre='+genre)
export const loadSeriesById = (id) => api.get('series/'+id)

const apis = {
    loadGenres: () => api.get('genres'),
    saveSeries:saveSeries,
    loadSeriesByGenre:loadSeriesByGenre,
    deleteSeries:(id) => api.delete('series/'+id),
    loadSeriesById,
    updateSeries
}

export default apis