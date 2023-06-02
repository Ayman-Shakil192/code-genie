import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {
  Box,
  Center,
  Flex,
  Avatar,
  Button,
  Menu,
  Input,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Link,
  Image,
} from "@chakra-ui/react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { ChevronDownIcon } from "@chakra-ui/icons";
// import SideBar from "../Sidebar/SideBar";
import Terminal from "../Terminal/Terminal";
import Loader from "../Loader/Loader";
import languageData from "./languageData";
import { Configuration, OpenAIApi } from "openai";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [inputText, setInputText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState("");
  const [placeholder, setPlaceholder] = useState("Choose a language");
  const [languageName, setLanguageName] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserName(data.name);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate, fetchUserName]);

  const name = userName.split(" ")[0];

  const handleGenerate = async () => {
    setGenerating(true);
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText + " in " + languageName.toLowerCase(),
      max_tokens: 100,
      temperature: 0,
    });
    console.log(response);
    setCode(response.data.choices[0].text);
    setGenerating(false);
  };

  const generatedCode = useTypewriter(code);

  return isFetching ? (
    <Loader />
  ) : (
    <>
      {/* <SideBar />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        > */}
      <Box px={4}>
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingTop={5}
          paddingRight={5}
        >
          <Box
            style={{
              fontWeight: 700,
              fontSize: "1.2rem",
              paddingLeft: "1rem",
            }}
          >
            CodeGenie
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <Box
                  style={{
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    margin: "auto 0",
                  }}
                >
                  Welcome {name}
                </Box>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    name="Ayman Shakil"
                    src="https://bit.ly/dan-abramov"
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to={"/editProfile"}>
                    <MenuItem>Edit Profile</MenuItem>
                  </Link>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box padding={5}>
        <Flex>
          <Input
            placeholder="Enter your query here"
            size="lg"
            style={{
              width: "85%",
            }}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Box paddingLeft={5}>
            <Button
              size="lg"
              variant={"outline"}
              color={"#8f43ee"}
              colorScheme="#8f43ee"
              onClick={handleGenerate}
            >
              {generating ? "Generating..." : "Generate"}
            </Button>
          </Box>
          <Box paddingLeft={5}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                size={"lg"}
                bg={"#8f43ee"}
                color={"white"}
                px={7}
              >
                {placeholder}
              </MenuButton>
              <MenuList>
                {languageData.map((language) => (
                  <MenuItem
                    key={language.id}
                    minH="40px"
                    onClick={() => {
                      const languageName = language.name;
                      setPlaceholder(languageName);
                      setLanguageName(languageName);
                    }}
                  >
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src={language.image}
                      alt={`${language.name} logo`}
                      mr="12px"
                    />
                    <div>{language.name}</div>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
      <div>
        <Terminal generatedCode={<pre>{generatedCode}</pre>} />
      </div>
    </>
  );
};

export default Dashboard;
