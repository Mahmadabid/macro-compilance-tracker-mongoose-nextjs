import Comp from '../../models/Comp';
import connectDB from '../../middleware/database'

// Default data for posting if no data is present in the db for a specific date
const defData = (date) => {
  return (
    {
      calories: {
        target: 0,
        gain: 0
      },
      carbs: {
        target: 0,
        gain: 0
      },
      fat: {
        target: 0,
        gain: 0
      },
      protein: {
        target: 0,
        gain: 0
      },
      date: date
    })
}

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await connectDB();

  // Switch based on the method
  switch (method) {
    case 'GET':
      try {
        // Get the comp for the current date
        const comp = await Comp.findOne({ date: req.query.date });
        
        // If comp exist for the current date
        if (comp) {
          res.status(200).json({ success: true, data: comp });
        } 
        // If no comp exist for the current date, create a new comp
        else {
          const defComp = await Comp.create(defData(req.query.date));
          res.status(200).json({ success: true, data: defComp });
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        // Get the data from the request
        const data = await JSON.parse(req.body);

        // Find and update the comp for the current date
        const comp = await Comp.findOneAndUpdate({ date: data.date }, data, { new: true });
        res.status(200).json({ success: true, data: comp });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}