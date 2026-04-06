import { useEffect, useState, useCallback } from 'react'
import { getShowsList } from '../../services/apiServices'

export default function useShows() {
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [refresh, setRefresh] = useState(0)
    
    const [bookmarks, setBookmarks] = useState({ 1: "" })
    const [hasMore, setHasMore] = useState(true)

    const fetchShows = useCallback(async (pageNumber) => {
        setLoading(true)
        try {
            const bookmarkToUse = bookmarks[pageNumber] || ""
            const data = await getShowsList(bookmarkToUse)
            
            const results = Array.isArray(data?.result) ? data.result : []
            setShows(results)

            const nextBookmark = data.metadata?.bookmark;

            if (nextBookmark) {
                setBookmarks(prev => ({
                    ...prev,
                    [pageNumber + 1]: nextBookmark
                }))
                // Se retornou 10 registros, provavelmente tem mais
                setHasMore(data.metadata.fetched_records_count == results.length)
            } else {
                setHasMore(false)
            }
        } catch (err) {
            console.error("Erro ao buscar shows:", err)
            setShows([])
            setHasMore(false)
        } finally {
            setLoading(false)
        }
    }, [bookmarks])

    // Reset quando muda busca ou refresh
    useEffect(() => {
        setBookmarks({ 1: "" })
        setCurrentPage(1)
        // O useEffect debaixo cuidará da chamada inicial
    }, [searchTerm, refresh])

    // Dispara a busca quando a página muda
    useEffect(() => {
        fetchShows(currentPage)
    }, [currentPage, refresh, searchTerm])

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage)
    }

    return {
        shows,
        loading,
        setSearchTerm,
        searchTerm,
        setRefresh,
        currentPage,
        handlePageChange,
        hasMore
    }
}