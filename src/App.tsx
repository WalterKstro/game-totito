import { useEffect, useState } from "react"
import Square from "./components/Square"
import Turn from "./components/Turn"
import Modal from "./components/Modal"

enum TURNS {
  'x' = 'X',
  'o' = 'O'
}

enum SECUENCES {
  ROWS = 'rows',
  COLS = 'cols',
  DIAGONALS = 'diagonals'
}

const POSITIONS_WINNERS: Record<SECUENCES, number[][]> =  {
  [SECUENCES.ROWS] : [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  [SECUENCES.COLS] : [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ],
  [SECUENCES.DIAGONALS] : [
    [0, 4, 8],
    [2, 4, 6]
  ]
}

function App() {
  // board positions
  const [positions, setPositions] = useState<string[]>(Array(9).fill(null))
  // turn X or O
  const [turn, setTurn] = useState<string>(TURNS.o)
  // the winner
  const [winner, setWinner] = useState<string | null>(null)
  // end game
  const [isEnd, setEnd] = useState<boolean>(false)


  // mark one position on board
  function handlerMarkPosition(index:number): void {
    const clonePositions = [...positions]
    clonePositions[index] = turn

    if(!isEnd){
      isPositionAvailability(index) && setPositions(clonePositions)
    }
    
  }

  // check if the position is availagility
  function isPositionAvailability(index:number):boolean {
    return positions[index] ? false : true 
  }

  // check if there's a winner
  function handlerVerityWinner( positions:string[] ):boolean{
    const isWinnerInRows:boolean = winnerIsOn(positions,POSITIONS_WINNERS.rows);
    const isWinnerInCols:boolean = winnerIsOn(positions,POSITIONS_WINNERS.cols);
    const isWinnerInDiangonals:boolean = winnerIsOn(positions,POSITIONS_WINNERS.diagonals);

    return isWinnerInRows || isWinnerInCols || isWinnerInDiangonals
  }

  // check if winner is on ROWS, COLS or DIAGONALS
  function winnerIsOn(positions:string[], positionsWinners:number[][]):boolean{
    for(const secuence of positionsWinners){
      const [firstIndex,secondIndex,thirtdIndex] = secuence
      
      if( positions[firstIndex] == turn && positions[secondIndex] == turn && positions[thirtdIndex] == turn ){
        return true
      }
    }

    return false
  }

  // change the turn of player
  function changeOfTurn(turn:string):void {
    const turnOf:string = (turn === TURNS.x) ? TURNS.o : TURNS.x
    setTurn(turnOf)
  } 

  // was last turn
   function isLastTurn():boolean {
    const listOfNull:string[] = positions.filter( position => position == null )
    return listOfNull.length == 0
  }

  // new game
  function handlerReset():void {
    setPositions(Array(9).fill(null))
    setTurn(TURNS.o)
    setWinner(null)
    setEnd(false)
  }

  useEffect(() => {
    if (handlerVerityWinner( positions )) {
      setWinner(turn)
      setEnd(true)
    }

    isLastTurn() && setEnd(true)

    changeOfTurn(turn)

  },[positions])

  
  return (
    <>
      <main className="h-screen flex relative">
      <div className="m-auto">
        <h1 className="mb-4 text-4xl text-center">Game Totito</h1>
        <section className="mb-2 w-[300px] h-[300px] grid grid-cols-3 grid-rows-3 gap-2">
          { 
            positions.map(
                (value,index) => (
                  <Square 
                    key={index} 
                    index={index} 
                    handlerMarkPosition={handlerMarkPosition}>
                      {value}
                  </Square>
                )
              ) 
          }
        </section>
        <section>
          <h2 className="flex justify-center gap-4 items-center text-xl">It's turn of : { <Turn turn={turn}/> }</h2>
        </section>
      </div>
      <Modal 
        winner={winner} 
        isEnd={isEnd}
        handlerReset={handlerReset}/>
    </main>
    </>
  )
}

export default App
