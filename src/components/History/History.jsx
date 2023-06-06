import { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { auth, db } from "../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "queries")
        );
        const data = querySnapshot.docs.map((doc) => doc.data());
        setHistoryData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <SideBar>
      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <TableCaption>Query related data is stored here</TableCaption>
          <Thead>
            <Tr>
              <Th>Request ID</Th>
              <Th>Query</Th>
              <Th>Language Chosen</Th>
              <Th>Date</Th>
              <Th>Response Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan="5" textAlign="center">
                  Loading...
                </Td>
              </Tr>
            ) : (
              historyData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.id}</Td>
                  <Td>{row.query}</Td>
                  <Td>{row.languageChosen}</Td>
                  <Td>{row.timestamp}</Td>
                  <Td>{row.responseTime}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </SideBar>
  );
};

export default History;
