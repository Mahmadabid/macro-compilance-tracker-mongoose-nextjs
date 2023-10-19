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
            const existingMacroEntry = await Macro.findOne({ userId, date });

            if (existingMacroEntry) {
                Object.assign(existingMacroEntry.macros, macros);
                await existingMacroEntry.save();
                return res.status(200).json({ message: "Macro entry updated", entry: existingMacroEntry });
            } else {
                // Otherwise, create a new entry
                const newMacroEntry = await Macro.create({ userId, date, macros });
                return res.status(201).json({ message: "Macro entry created", entry: newMacroEntry });
            }
        } catch (error) {
            return res.status(500).json({ error: "Error creating/updating macro entry.", details: error.message });
        }
    } else if (req.method === 'GET') {
        const userId = req.query.userId;
        const date = req.query.date;

        // Check for the presence of userId and date in the query parameters
        if (!userId || !date) {
            return res.status(400).json({ error: "UserId and date are required." });
        }

        try {
            const userMacros = await Macro.find({ userId: userId, date: date });

            // If no data is found for the given userId and date
            if (!userMacros.length) {
                return res.status(404).json({ error: "No data found for the given userId and date." });
            }

            return res.status(200).json(userMacros);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching user macro data.", details: error.message });
        }

    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
