import React, { useCallback, useRef } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function UsePokes() {
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
    }

    const fetchMore = async () => {
        setOffset(prev => prev + 8)
        setLimit(8)
        setLoading(false)
        axios.get(URL)
            .then(res => {
                setPokes(prev => [...prev, ...res.data.results])
                setHasMore(res.data.results.length > 0)
            })
    }

    useEffect(() => {
        firstFetch()
        setLoading(false)
        setOffset(16)
        setLimit(8)
    }, [])

    const observer = useRef()
    const last = useCallback(node=>{
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
        if (entries[0].isIntersecting && hasMore) {
            fetchMore()
        }
        })
        if (node) observer.current.observe(node)
    }, [ pokes])

    return {fetchMore, pokes, loading, last}
}

export default UsePokes