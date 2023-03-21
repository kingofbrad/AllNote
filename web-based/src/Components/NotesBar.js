import React, { useState } from "react";
import {
  Box,
  useColorModeValue,
  Flex,
  Heading,
  Button,
  IconButton,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  MenuDivider,
  MenuGroup,
  Link as ChakraLink,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Icon,
} from "@chakra-ui/react";
import { IconDarkMode, TextDarkmode } from "../DarkModeToggle";
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  AddIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { BiBell, BiBookBookmark, BiCalendar } from "react-icons/bi";
import { MdEditNote, MdNoteAdd, MdSearch } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import NotesSection from "./NotesSection";

const NotesBar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activenote,
  setActiveNote,
  DrawerOpen,
}) => {
  const borderColor = useColorModeValue("gray.700", "gray.700");
  const buttonColor = useColorModeValue("gray.300", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const searchbg = useColorModeValue("gray.200", "gray.900");
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const drawerRef = React.useRef();
  const menuRef = React.useRef();
  const [inputText, setInputText] = useState("");

  return (
    <Box
      w={{ base: "100%", md: "30%" }}
      h={"100vh"}
      display={"flex"}
      flexDir={"column"}
      borderRight={{ md: "2px solid" }}
    >
      <Flex ml={"20px"} mt={"10px"} gap={"20px"}>
        <Button as={"a"} href={"https://bradleeking.com/MainWorkPage"}>
          Go Back
        </Button>
        <Button
          gap={"10px"}
          as={"a"}
          href={"https://github.com/kingofbrad/NoteBook"}
          target={"_blank"}
          color={"gray.500"}
          _hover={{ color: "gray.100" }}
        >
          <Icon as={AiFillGithub} />
          Source Code
        </Button>
      </Flex>
      <Flex justifyContent={"space-between"} p={"25px"}>
        <Heading
          fontSize={"28px"}
          bgClip="text"
          bgGradient="linear(to-l, #7298CA, #FF0080)"
        >
          NoteBook
        </Heading>
        <Box display={{ base: "none", md: "flex" }} gap={"4"}>
          <IconButton
            onClick={onAddNote}
            bg={"inherit"}
            icon={<MdEditNote />}
            _hover={{
              textDecoration: "none",
              color: "gray.600",
            }}
          />
          <IconDarkMode bg={borderColor} />
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <Button bg={"inherit"} onClick={onAddNote} mr={"10px"}>
            Add New Note
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              onClick={isOpen ? onClose : onOpen}
              icon={<HamburgerIcon color={buttonColor} />}
              ref={menuRef}
            />
            <MenuList>
              <MenuGroup title="Notes App">
                <MenuItem
                  _hover={{ bg: buttonColor }}
                  onClick={onAddNote}
                  textAlign={"center"}
                >
                  Add Note
                </MenuItem>
                <MenuItem
                  onClick={toggleColorMode}
                  color={textColor}
                  _hover={{ bg: buttonColor }}
                >
                  Toggle Dark Mode
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Other Apps">
                <MenuItem icon={<BiBell />}>Reminders</MenuItem>
                <MenuItem icon={<BiCalendar />}>Calander</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Box mb={"3"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          mx={"5%"}
          rounded="md"
          justifyContent={"center"}
          bg={searchbg}
        >
          <MdSearch size="1.6em" />
          <Input
            onChange={(e) => setInputText(e.target.value)}
            w={"80%"}
            type={"text"}
            border="none"
            focusBorderColor="none"
            placeholder={"Search Notes Here"}
          />
        </Box>
      </Box>

      <div className="app-sidebar-notes">
        {sortedNotes &&
          sortedNotes
            .filter((note) => note.title.toLowerCase().includes(inputText))
            .map((note) => (
              <div
                className={`app-sidebar-note ${
                  note.id === activenote && "active"
                }`}
                onClick={() => setActiveNote(note.id)}
              >
                <Box display={"flex"} gap={"2"}></Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Heading fontSize={"25px"}>
                    {note.title && note.title.substr(0, 20)}
                  </Heading>
                  <Box>
                    <IconButton
                      onClick={() => onDeleteNote(note.id)}
                      icon={<DeleteIcon />}
                      border="none"
                      bg={"inherit"}
                    />
                  </Box>
                </Box>

                <Text overflowX={"hidden"} m={0}>
                  {note.body && note.body.substr(0, 40) + "..."}
                </Text>

                <small className="note-meta">
                  Last modified{" "}
                  {new Date(note.lastModified).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}
      </div>
    </Box>
  );
};

export default NotesBar;
