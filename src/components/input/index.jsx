export const Input = ({value, error, name, ...props}) => (
    <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-500 mb-2" htmlFor={name}></label>
        <input {...props} name={name} id={name}  className={`p-4 text-left border border-grey-700 rounded-xl focus:outline focus:outline-1 ${error && 'border-red-700'}`}  />
        <span className="p-2 text-sm text-red-700">{error}</span>
    </div>

)
