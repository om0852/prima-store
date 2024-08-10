import { connectToDB } from "@/lib/connect";
import Order from "@/models/Order";

  export default async function handler(req,res){
    try {
        await connectToDB();
// Helper function to get the start and end of a day
const getDayStartAndEnd = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };
  
  // Helper function to get the start and end of a month
  const getMonthStartAndEnd = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    return { start, end };
  };

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
    
        const { start: todayStart, end: todayEnd } = getDayStartAndEnd(today);
        const { start: yesterdayStart, end: yesterdayEnd } = getDayStartAndEnd(yesterday);
        const { start: monthStart, end: monthEnd } = getMonthStartAndEnd(today);
    
        const [todayTotal, yesterdayTotal, monthTotal] = await Promise.all([
          Order.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } }),
          Order.countDocuments({ createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } }),
          Order.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } }),
        ]);
    
        res.json({
          today: todayTotal,
          yesterday: yesterdayTotal,
          month: monthTotal
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
  }