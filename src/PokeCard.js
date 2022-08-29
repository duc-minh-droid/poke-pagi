import React, { useEffect, useState } from 'react'
import axios from 'axios'

function PokeCard({ URL, name }) {
    const [poke, setPoke] = useState()

    useEffect(() => {
        axios.get(URL)
            .then(res => res.data)
            .then(res => setPoke({
                abilities: res.abilities,
                moves: res.moves,
                stats: res.stats,
                types: res.types,
                image: res.sprites.front_default
            }))
    }, [])

    return (
        <>
            {poke && <div className='flex w-full justify-around py-6 bg-slate-50 rounded-xl hover:shadow-2xl'>
                <img alt='' src={poke.image} className="bg-slate-200 p-2 rounded-xl"/>
                <div>
                    <div className='text-2xl'>{name}</div>
                    <p>Types: {poke.types.map(e => e.type.name).join(', ')}</p>
                    <p>Abilities: {poke.abilities.map(e => e.ability.name).join(', ')}</p>
                    <p>Moves: {poke.moves.length}</p>
                </div>
                <div>
                    {poke.stats.map(e => ({ name: e.stat.name, stat: e.base_stat })).map(e => <p>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}: {e.stat}</p>)}
                </div>
            </div>}
        </>)
}

export default PokeCard