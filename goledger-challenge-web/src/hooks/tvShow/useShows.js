import { useEffect, useState, useCallback } from 'react'
import { getShowsList, getSearchedShow } from '../../services/apiServices'

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

        if (searchTerm) {

            try {
                const responseSearch = await getSearchedShow("", searchTerm)

                setShows(Array.isArray(responseSearch) ? responseSearch : [])
                setHasMore(false)

            } catch (err) {

                console.error("Erro na busca:", err)
                setShows([])

            } finally {

                setLoading(false)

            }

        } else {

            try {

                const bookmarkToUse = bookmarks[pageNumber] || ""

                const data = await getShowsList(bookmarkToUse)

                const results = Array.isArray(data?.result) ? data.result : []

                setShows(results)

                const nextBookmark = data.metadata?.bookmark

                if (nextBookmark) {

                    setBookmarks(prev => ({
                        ...prev,
                        [pageNumber + 1]: nextBookmark
                    }))

                    setHasMore(results.length === 6)

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
        }

    }, [bookmarks, searchTerm])

    useEffect(() => {

        setBookmarks({ 1: "" })
        setCurrentPage(1)

    }, [searchTerm, refresh])

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