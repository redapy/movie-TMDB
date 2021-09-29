import { useState, useEffect } from 'react';
//API
import API from '../API'

const initialState = {
    page: 0,
    results: [],
    total_page: 0,
    total_results: 0
}

export const useHomeFetch = () => {

    const [searchTerm, setSearchTerm] = useState();
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetcMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            setState(prev => ({
                ...movies,
                results: 
                page > 1 ? [...prev.results, ...movies.results] : [...movies.results] 
            }))

        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    //intial and search
    useEffect(() => {
        fetcMovies(1, searchTerm)
    },[searchTerm]);

    //Load movies 
    useEffect(() => {
        if (!isLoading) return;

        fetcMovies(state.page +1, searchTerm);
        setIsLoading(false)
    }, [isLoading, state.page, searchTerm])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoading}

}