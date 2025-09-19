import {useState} from 'react';

export function PostCodeForm({onSubmit} : {onSubmit: Function}) {
  const [postCode, setPostCode] = useState<string>("");

  const handlePostCodeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPostCode(event.currentTarget.value);
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent page frefresh
    onSubmit(postCode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Enter a post code:
        <input 
          type="text"
          dir="rtl"
          onChange={handlePostCodeChange}
          value={postCode}
          className=' mr-1'
        />
      </label>
      <button type="submit" className="bg-blue-300 hover:bg-green-300 text-white font-semibold hover:text-white py-2 px-4 mb-3 border border-blue-500 hover:border-green-500 rounded">
        Nearest Arrivals
      </button>
    </form>
  )
}