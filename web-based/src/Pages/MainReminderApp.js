import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import uuid from "react-uuid";
import { ReminderBar } from "../Components/Reminder_Components/ReminderBar";
import { ReminderSection } from "../Components/Reminder_Components/ReminderSection";
const MainReminderApp = () => {
  useEffect = () => {
    document.title = "AllNote || Reminders";
  };

  const [reminders, setReminders] = useState(
    localStorage.reminders ? JSON.parse(localStorage.reminders) : []
  );
  const [activereminder, setActiveReminder] = useState(false);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("reminder", JSON.stringify(reminders));
  }, [reminders]);

  const onAddReminder = () => {
    const NewReminder = {
      id: uuid(),
      title: "untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    toast({
      title: "Remdiner Created",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-left",
    });
    setReminders([NewReminder, ...reminders]);
  };

  const onDeleteReminder = (idToDelete) => {
    setReminders(reminders.filter((reminder) => reminder.id !== idToDelete));
    toast({
      title: "Reminder Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const getActiveReminder = () => {
    return reminders.find((reminder) => reminder.id === activereminder);
  };

  const onUpdateReminder = (updatedReminder) => {
    const updatedReminderArray = reminders.map((reminder) => {
      if (reminder.id === activereminder) {
        return updatedReminder;
      }
      return reminder;
    });
    setReminders(updatedReminderArray);
  };
  return (
    <div name="reminders">
      <Flex>
        <ReminderBar />
        <ReminderSection />
      </Flex>
    </div>
  );
};

export default MainReminderApp;
