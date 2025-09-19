import {useState} from 'react';

export function StopCodeForm({onSubmit} : {onSubmit: Function}) {
  const [stopCode, setStopCode] = useState<string>("");

  const handleStopCodeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStopCode(event.currentTarget.value);
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent page frefresh
    onSubmit(stopCode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Enter a stop code:
        <input 
          type="text"
          dir="rtl"
          onChange={handleStopCodeChange}
          value={stopCode}
          className='pr-1 mr-1'
        />
      </label>
      <button type="submit" className="bg-blue-300 hover:bg-green-300 text-white font-semibold hover:text-white py-2 px-4 mb-3 border border-blue-500 hover:border-green-500 rounded">
        Arrivals
      </button>
    </form>
  )
}