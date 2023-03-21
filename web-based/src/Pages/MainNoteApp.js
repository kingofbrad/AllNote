import "../App.css";
import {
  color,
  Box,
  Flex,
  Heading,
  IconButton,
  Toast,
  useColorMode,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import NotesBar from "../Components/NotesBar";
import NotesSection from "../Components/NotesSection";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

function MainNoteApp() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activenote, setActiveNote] = useState(false);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.title = "AllNote || NoteBook";
  });

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    toast({
      title: "Note created",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-left",
    });

    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    toast({
      title: "Note Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activenote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activenote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  return (
    <Flex name="notebook">
      <NotesBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activenote={activenote}
        setActiveNote={setActiveNote}
      />

      <NotesSection
        activeNote={getActiveNote(notes)}
        onUpdateNote={onUpdateNote}
      />
    </Flex>
  );
}

export default MainNoteApp;
