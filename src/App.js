import PokeCard from "./PokeCard";
import UsePokes from "./UsePoke";

function App() {
  const {fetchMore, pokes, loading, last } = UsePokes()

  return (
    <>
      <p className="text-center text-6xl mt-10">Bai tap Checkpoint</p>
      <div className="flex justify-between px-10 w-full">
        <div></div>
        <p className="shadow-xl bg-green-600 p-2 rounded-full hover:scale-105 transition-all">Cre: <a href="https://github.com/duc-minh-droid/poke-pagi" className="text-cyan-300">Duc Minh</a></p>
      </div>
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
