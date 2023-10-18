import Macro from "@/db/model";
import connectDb from "@/db/mongodb";

export default async function handler(req, res) {
    await connectDb();

    if (req.method === 'POST') {
        const { userId, date, macros } = req.body;

        // Check for required fields
        if (!userId || !date || !macros) {
            return res.status(400).json({ error: "Required fields are missing." });
        }

        try {
            const newMacroEntry = await Macro.create({ userId, date, macros });
            return res.status(201).json({ message: "Macro entry created", entry: newMacroEntry });
        } catch (error) {
            return res.status(500).json({ error: "Error creating macro entry.", details: error.message });
        }

    } else if (req.method === 'GET') {
        try {
            const macros = await Macro.find();
            return res.status(200).json({ macros });
        } catch (error) {
            return res.status(500).json({ error: "Error fetching macro entries.", details: error.message });
        }

    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
