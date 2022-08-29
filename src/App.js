import PokeCard from "./PokeCard";
import UsePokes from "./UsePoke";

function App() {
  const {fetchMore, pokes, loading, last } = UsePokes()

  return (
    <>
      <p className="text-center text-6xl mt-10">Bai tap Checkpoint</p>
      <div className="App w-full flex flex-col gap-10 mt-16 px-36">
        {pokes && pokes.map((e, id) => {
          if (pokes.length == id + 1) {
            return <div key={id} ref={last} className='w-full'>
              <PokeCard name={e.name} URL={e.url} key={id} />
            </div>
          } else {
            return <div key={id} className='w-full'>
              <PokeCard name={e.name} URL={e.url} key={id} />
            </div>
          }
        })}
        {loading && "...Loading"}
      </div>
    </>
  );
}

export default App;
