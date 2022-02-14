import { formProps } from "../types/form";

const Form = ({onChange, label}: formProps) => {

  return (
        <form className="bg-white px-8 pb-8 basis-1/2 xsm:basis-full" id="compliance">
          <h1 className='text-2xl font-bold pb-2'>{label}</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calories">
              Calories
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={label + " calories"} id="calories" type="number" placeholder="Calories" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carbs">
              Carbs
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={label + " carbs"} id="carbs" type="number" placeholder="Carbs" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="protein">
              Protein
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={label + " protein"} id="protein" type="number" placeholder="Protein" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fat">
              Fat
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={label + " fat"} id="fat" type="number" placeholder="Fat" onChange={(e) => onChange(e)} />
          </div>
        </form>
    )
}

export default Form;