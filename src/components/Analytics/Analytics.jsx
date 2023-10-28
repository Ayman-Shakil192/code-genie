// import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import graphData from "../../constants/graphData";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../Firebase/Firebase";
// import { collection, getDocs } from "firebase/firestore";
import SideBar from "../Sidebar/SideBar";

const Analytics = () => {
  // const [data, setData] = useState([]);
  // const [user] = useAuthState(auth);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(
  //         collection(db, "users", user?.uid, "queries")
  //       );

  //       const responseData = querySnapshot.docs.map((doc) => {
  //         let data = doc.data();
  //         let pv = Math.floor(Math.random() * 4000) + 1000; // Random integer between 1000 and 5000
  //         let amt = Math.floor(Math.random() * 4000) + 1000; // Random integer between 1000 and 5000
  //         return {
  //           ...data,
  //           uv: parseFloat(data.responseTime) * 1000, // convert to milliseconds
  //           name: data.languageChosen,
  //           pv: pv,
  //           amt: amt,
  //         };
  //       });

  //       setData(responseData);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [user?.uid]);

  return (
    <SideBar>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={730}
          height={250}
          data={graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </SideBar>
  );
};

export default Analytics;
