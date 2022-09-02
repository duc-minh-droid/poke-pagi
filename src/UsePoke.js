import React, { useCallback, useRef } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function UsePokes(search) {
    const [pokes, setPokes] = useState([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [limit, setLimit] = useState(16)

    let URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const firstFetch = async () => {
        axios.get(URL)
            .then(res => {
                setPokes(res.data.results)
                setHasMore(res.data.results.length > 0)
            })
        setOffset(16)
    }

    const fetchMore = async () => {
        setOffset(prev => prev + 8)
        setLimit(8)
        setLoading(false)
    }

    useEffect(() => {
        axios.get(URL)
            .then(res => {
                setPokes(prev => [...new Set([...prev, ...res.data.results])])
                setHasMore(res.data.results.length > 0)
            })
        console.log(offset)
    }, [offset])

    useEffect(() => {
        firstFetch()
        setLoading(false)
        setLimit(8)
    }, [])

    useEffect(() => {
        setPokes([])
    }, [])

    const observer = useRef()
    const last = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMore()
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return { fetchMore, pokes, loading, last }
}

export default UsePokes