interface IProps {
    winner:string|null,
    isEnd:boolean,
    handlerReset:()=>void
}
function Modal({winner,isEnd,handlerReset}:IProps) {
  return (
    <div id="defaultModal" aria-hidden="true" className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${ isEnd ? 'block' : 'hidden'}`}>
      <div className="relative w-full max-w-2xl max-h-full">
          {/* content */}
          <div className="relative rounded-lg shadow bg-gray-700 p-6">
              {/* body */}
              <div className="space-y-6">
                  <p className="text-2xl text-gray-200 py-4">
                      { winner ? <span className="block text-center">Felicidades {winner}</span> : 'Empatados'}
                  </p>
              </div>
              {/* footer */}
              <div className="border-gray-600 rounded-b ">
                  <button 
                    data-modal-hide="defaultModal" 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                    onClick={handlerReset}>New game</button>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Modal