import { FormInput, FormProps } from "@/types/types";
import { useState } from "react";

const Form: React.FC<FormProps> = ({ heading, onSave, setPress }) => {

    const formInput: FormInput = {
        calories: "",
        proteins: "",
        carbs: "",
        fats: "",
    }

    const [formData, setFormData] = useState<FormInput>(formInput);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: FormInput) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setFormData(formInput)
        setPress(true)
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2 px-10 py-4">
            <h2 className="text-2xl font-bold mb-4">{heading}</h2>
            {["Calories", "Proteins", "Carbs", "Fats"].map((macro) => {
                const key = macro.toLowerCase() as keyof FormInput;

                return (
                    <div key={macro} className="mb-3">
                        <label className="block mb-1 capitalize font-bold">{macro}</label>
                        <input
                            type="number"
                            id={macro}
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleInputChange}
                            placeholder={`Enter ${macro}`}
                            className="bg-gray-100 p-2 border rounded"
                        />
                    </div>
                );
            })}

            <button type="submit" className="mt-4 bg-blue-500 text-white px-8 py-2 font-bold rounded hover:bg-blue-600">
                Save
            </button>

        </form>
    );
}

export default Form;
