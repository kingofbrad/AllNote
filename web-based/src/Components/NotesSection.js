import React, { useState, useRef } from "react";
import {
  Box,
  Drawer,
  Input,
  Textarea,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { MdEditNote } from "react-icons/md";

const NotesSection = ({ activeNote, onUpdateNote, drawerRef }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return (
      <Box display={{ base: "none", md: "block" }} className="no-active-note">
        No Active Note Selected
      </Box>
    );

  return (
    <Box h={"100vh"} w={{ base: "0%", md: "70%" }}>
      <IconButton
        onClick={onOpen}
        bg={"inherit"}
        icon={<MdEditNote size={'28px'} />}
        _hover={{
          textDecoration: "none",
          color: "gray.600",
        }}
        pos={"absolute"}
        display={{ base: "block", md: "none" }}
        left={"50%"}
        top={"2.5%"}
        ref={btnRef}
      />

      <Box h={"20vh"} mx={"2"} my={"2"} display={{ base: "none", sm: "block" }}>
        <Input
          rounded={"5px 5px 0 0"}
          border={"none"}
          fontSize={"3xl"}
          fontWeight={"extrabold"}
          type={"text"}
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          placeholder={"Add your title"}
        />
        <Textarea
          border={"none"}
          h={"40vh"}
          resize={"none"}
          focusBorderColor="none"
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
          placeholder={"Write your notes here"}
        />
      </Box>
      <Box display={{ base: "block", sm: "none" }}>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={drawerRef}
          closeOnOverlayClick={true}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Box mb={"1rem"} display={"flex"}>
              <IconButton
                onClick={onClose}
                as={ChevronLeftIcon}
                bg={"inherit"}
                ml={"10px"}
                mt={"10px"}
              />
            </Box>
            <Input
              rounded={"5px 5px 0 0"}
              border={"none"}
              fontSize={"3xl"}
              fontWeight={"extrabold"}
              type={"text"}
              focusBorderColor="none"
              value={activeNote.title}
              onChange={(e) => onEditField("title", e.target.value)}
              placeholder={"Add your title"}
            />
            <Textarea
              border={"none"}
              h={"40vh"}
              resize={"none"}
              focusBorderColor="none"
              value={activeNote.body}
              onChange={(e) => onEditField("body", e.target.value)}
              placeholder={"Write your notes here"}
            />
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default NotesSection;
