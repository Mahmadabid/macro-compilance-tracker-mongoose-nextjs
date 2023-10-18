import React from 'react';

type FormProps = {
    heading: string;
};

const Form: React.FC<FormProps> = ({ heading }) => {
    return (
        <div className="w-1/2 px-10 py-4">
            <h2 className="text-2xl font-bold mb-4">{heading}</h2>
            {["Calories", "Proteins", "Carbs", "Fats"].map(macro => (
                <div key={macro} className="mb-3">
                    <label className="block mb-1 capitalize font-bold">{macro}</label>
                    <input type="number" placeholder={`Enter ${macro}`} className="bg-gray-100 p-2 border rounded" />
                </div>
            ))}
            <button className="mt-4 bg-blue-500 text-white px-8 py-2 font-bold rounded hover:bg-blue-600">
                Save
            </button>

        </div>
    );
}

export default Form;
