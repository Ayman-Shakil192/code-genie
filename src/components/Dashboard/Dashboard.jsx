import SideBar from "../Sidebar/SideBar";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Dashboard.css";
import { auth, db } from "../Firebase/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Configuration, OpenAIApi } from "openai";
import {
  Box,
  Flex,
  Button,
  Menu,
  Input,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Terminal from "../Terminal/Terminal";
import languageData from "../../constants/languageData";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [inputText, setInputText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState("");
  const [placeholder, setPlaceholder] = useState("Choose a language");
  const [languageName, setLanguageName] = useState("");

  const notebook_url = "CODE_GENIE.ipynb";
  fetch(notebook_url) // fetch the notebook
    .then((response) => response.json())
    .then((data) => {
      data.cells.map((cell) => {
        return cell.output;
      });
    });

  const DEFAULT_PLACEHOLDER = "Choose a language";

  const initOpenAI = async (inputText, languageName) => {
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_APP_OPEN_AI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${inputText} in ${languageName.toLowerCase()}`,
      max_tokens: 100,
      temperature: 0,
    });
    return response;
  };

  const saveToFirestore = async (
    response,
    responseTime,
    languageName,
    inputText
  ) => {
    if (!user?.uid) {
      throw new Error("User not authenticated.");
    }

    const timestamp = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const roundedResponseTime = responseTime.toFixed(2);
    const formattedResponseTime = `${roundedResponseTime}s`;

    await setDoc(
      doc(
        collection(doc(db, "users", user.uid), "queries"),
        new Date().getTime().toString()
      ),
      {
        id: new Date().getTime().toString(),
        timestamp: timestamp,
        responseTime: formattedResponseTime,
        languageChosen: languageName,
        query: inputText,
        response: response.data.choices[0].text,
      }
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);

    try {
      if (placeholder === DEFAULT_PLACEHOLDER) {
        alert("Please choose a language");
        throw new Error("Language not chosen");
      }

      if (inputText === "") {
        alert("Please enter a query");
        throw new Error("Query not entered");
      }

      const startTime = performance.now();
      const response = await initOpenAI(inputText, languageName);
      const endTime = performance.now();
      const responseTime = (endTime - startTime) / 1000;

      console.log(response);
      setCode(response.data.choices[0].text);

      await saveToFirestore(response, responseTime, languageName, inputText);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setGenerating(false);
    }
  };

  const generatedCode = useTypewriter(code);
  return (
    <>
      <SideBar>
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
          </Flex>
        </Box>
        <div>
          <Terminal generatedCode={<pre>{generatedCode}</pre>} />
        </div>
      </SideBar>
    </>
  );
};

export default Dashboard;
